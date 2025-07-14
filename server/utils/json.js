import fs from 'fs/promises'
export async function readJsonFile(filePath){
    try{
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    }
    catch(error){
        console.error('Error reading JSON file:', error)
        return null
    }
}

export async function writeJsonFile(filePath, data){
    try{
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
        
    }
    catch(error){
        console.error('Error writing JSON file:', error)
        return null
    }
}
