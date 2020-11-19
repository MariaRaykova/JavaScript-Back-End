const { v4 } = require('uuid');
const fs = require('fs'); 
const path = require('path');

const databaseFilePath = path.join(__dirname, '..', 'config/database.json');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || 'No Name';
        this.description = description; 
        this.imageUrl = imageUrl || "placeholder"; 
        this.difficulty = difficulty || 0;
    }


    save() {  

        const newCube = { 
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        fs.readFile(databaseFilePath, (error, dbData) => { 
            if (error) {
                throw error;
            }
            const cubesData = JSON.parse(dbData);
            
            cubesData.push(newCube); 

            fs.writeFile(databaseFilePath, JSON.stringify(cubesData), (error) => { 
                if (error) {
                   
                    throw error;
                }
            });
        })
    }
}
module.exports = Cube; 