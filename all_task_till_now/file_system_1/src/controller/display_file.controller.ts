import fs from 'fs';
class ReadController {

    async merged(req:any, res:any) {
        try {
            const { f1 } =req.body;
            fs.readFile(`/home/appinventiv/Desktop/file_system_1/backup/${f1}`, 'utf8', (err, data) => {
                if (err) {
                console.error(err);
                return;
                }
                console.log("Data read");
                res.send(data);
            });
        } catch(err) {
                    console.error(err);
        }
    }
}

export const readController = new ReadController();
