import amqp from 'amqplib';
import sequelize from "./postgres.db";
import Buyer from "./models/postgresSQL/buyer.model";
import Seller from "./models/postgresSQL/seller.model";
import Address from './models/postgresSQL/address.model';

export async function connectToAMQP(data:any) {
  console.log("AMQP connection established");
  
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'user_queue';
  await channel.assertQueue(queue, { durable: false });
  const message = JSON.stringify(data);
  console.log("/////////////////////////////////////////////////");
  console.log(message);
  console.log("/////////////////////////////////////////////////");
  channel.sendToQueue(queue, Buffer.from(message));
  consumeFromAMQP();
  return channel;
}

export async function consumeFromAMQP() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'user_queue';
  await channel.assertQueue(queue, { durable: false });
  console.log("Waiting for messages in %s. To exit press CTRL+C", queue);
  await channel.consume(queue, async (message: any) => {
    const data = JSON.parse(message.content.toString());
    console.log("/////////////////////////////////////////////////");
    console.log('data', data);
    console.log("/////////////////////////////////////////////////");
    console.log('data11', data.key);
    console.log("/////////////////////////////////////////////////");
    let model;
    if (data.key === 'buyer') {
      model = Buyer;
    } else if (data.key === 'address') {
      model = Address;
    } else {
      model = Seller;
    }
    switch (data.operationType) {
      case 'insert':
        await insertUser(model, data.fullDocument);
        break;
      case 'update':
        await updateUser(model, data.documentKey._id, data.updateDescription.updatedFields);
        break;
      case 'delete':
        await deleteUser(model, data.documentKey._id);
        break;
    }
  }, { noAck: true });
  await channel.close();
  console.log('AMQP connection revoke');
}

async function insertUser(model: any, user: any) {
  try {
    await sequelize.query('BEGIN');
    console.log("=======================================");
    let result;
    if(model === Address){
      result = await model.create({ id:user._id, house_no:user.house_no, street_no:user.street_no, area:user.area, city:user.city, state:user.state, country:user.country, zip_code:user.zip_code, user_id:user.user_id });
    } else {
      result = await model.create({ id: user._id, name: user.name, email: user.email, password: user.password, ph_no: user.ph_no });
    }
    console.log("=========================", result);
    await sequelize.query('COMMIT');
    console.log(`Inserted user with ID ${user._id}`);
  } catch (e) {
    await sequelize.query('ROLLBACK');
    throw e;
  }
}

async function updateUser(model: any, id: string, fields: any) {
  try {
    await sequelize.query('BEGIN');
    console.log("jkhgfd", fields);
    let result;
    if(model === Address){
      result = await model.update({ house_no:fields.house_no, street_no:fields.street_no, area:fields.area, city:fields.city, state:fields.state, country:fields.country, zip_code:fields.zip_code }, { where: { id: id } });
    } else {
      result = await model.update({ name: fields.name, email: fields.email, password: fields.password, ph_no: fields.ph_no }, { where: { id: id } });
    }
    console.log("=========================", result);
    await sequelize.query('COMMIT');
    console.log(`Updated user with ID ${id}`);
  } catch (e) {
    await sequelize.query('ROLLBACK');
    throw e;
  }
}

async function deleteUser(model: any, id: string) {
  try {
    await sequelize.query('BEGIN');
    let result;
    if(model === Address){
      result = await model.destroy({ where: { id: id } });
    } else {
      result = await model.destroy({ where: { id: id } });
    }
    console.log("/////////////////////////////////////////////////");
    console.log('result', result);
    console.log("/////////////////////////////////////////////////");

    await sequelize.query('COMMIT');
    console.log(`Deleted user with ID ${id}`);
  } catch (e) {
    await sequelize.query('ROLLBACK');
    throw e;
  }
}


// import amqp from 'amqplib';
// import sequelize from "./postgres.db";
// import Buyer from "./models/postgresSQL/buyer.model";
// import Seller from "./models/postgresSQL/seller.model";

// export async function connectToAMQP(data:any) {
//   console.log("AMQP connection established");
  
//   const connection = await amqp.connect('amqp://localhost');
//   const channel = await connection.createChannel();
//   const queue = 'user_queue';
//   await channel.assertQueue(queue, { durable: false });
//   const message = JSON.stringify(data);
//   console.log("/////////////////////////////////////////////////");
//   console.log(message);
//   console.log("/////////////////////////////////////////////////");
//   channel.sendToQueue(queue, Buffer.from(message));
//   await channel.consume(queue, async (message: any) => {
//     const data = JSON.parse(message.content.toString());
//     console.log("/////////////////////////////////////////////////");
//     console.log('data', data);
//     console.log("/////////////////////////////////////////////////");
//     console.log('data11', data.key);
//     console.log("/////////////////////////////////////////////////");
//     let model;
//     if (data.key === 'buyer') {
//       model = Buyer;
//     } else {
//       model = Seller;
//     }
//     switch (data.operationType) {
//       case 'insert':
//         await insertUser(model, data.fullDocument);
//         break;
//       case 'update':
//         await updateUser(model, data.documentKey._id, data.updateDescription.updatedFields);
//         break;
//       case 'delete':
//         await deleteUser(model, data.documentKey._id);
//         break;
//     }
//   }, { noAck: true });
//   console.log('AMQP connection revoke');
//   return channel;
// }

// async function insertUser(model: any, user: any) {
//   try {
//     await sequelize.query('BEGIN');
//     console.log("=======================================");

//     const result = await model.create({ id: user._id, name: user.name, email: user.email, password: user.password, ph_no: user.ph_no });
//     console.log("=========================", result);
//     await sequelize.query('COMMIT');
//     console.log(`Inserted user with ID ${user._id}`);
//   } catch (e) {
//     await sequelize.query('ROLLBACK');
//     throw e;
//   }
// }

// async function updateUser(model: any, id: string, fields: any) {
//   try {
//     await sequelize.query('BEGIN');
//     console.log("jkhgfd", fields);

//     const result = await model.update({ name: fields.name, email: fields.email, password: fields.password, ph_no: fields.ph_no }, { where: { id: id } });
//     console.log("=========================", result);
//     await sequelize.query('COMMIT');
//     console.log(`Updated user with ID ${id}`);
//   } catch (e) {
//     await sequelize.query('ROLLBACK');
//     throw e;
//   }
// }

// async function deleteUser(model: any, id: string) {
//   try {
//     await sequelize.query('BEGIN');
//     const result = await model.destroy({ where: { id: id } });
//     console.log("/////////////////////////////////////////////////");
//     console.log('result', result);
//     console.log("/////////////////////////////////////////////////");

//     await sequelize.query('COMMIT');
//     console.log(`Deleted user with ID ${id}`);
//   } catch (e) {
//     await sequelize.query('ROLLBACK');
//     throw e;
//   }
// }

