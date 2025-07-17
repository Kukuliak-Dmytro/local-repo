import getLanguagesData from '../service/languages.js'

export async function getLanguagesHandler(req,res){
    try{
        const languages = await getLanguagesData()
        res.json(languages)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
export async function getLanguageByIdHandler(req,res){
    try{
        const {id} = req.params
        const allLanguages = await getLanguagesData()
        const language = allLanguages.find(language => language.id === parseInt(id))
        if(!language){
            res.status(404).json({error: 'Language not found'})
            return
        }
        res.json(language)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}