import fs from 'fs';
class MergedController {

    async merged(req:any, res:any) {
        try {
            const { f1, f2} =req.body;
            const f3 = `abc_${Date.now()}.txt`;
            fs.readFile(`/home/appinventiv/Desktop/file_system_1/uploads/${f1}`, 'utf8', (err, data1) => {
                if (err) {
                console.error(err);
                return;
                }
                console.log("Data 1 copied")
                fs.writeFile(`/home/appinventiv/Desktop/file_system_1/backup/${f3}`,data1,(err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                })
            });
            fs.readFile(`/home/appinventiv/Desktop/file_system_1/uploads/${f2}`, 'utf8', (err, data2) => {
                if (err) {
                console.error(err);
                return;
                }
                console.log("Data 2 copied")
                fs.appendFile(`/home/appinventiv/Desktop/file_system_1/backup/${f3}`,data2,(err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                })
            });
            res.send("Merged data saved in  backup")
        } catch(err) {
                    console.error(err);
        }
    }
}

export const mergedController = new MergedController();
