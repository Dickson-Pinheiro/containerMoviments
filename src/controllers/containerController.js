import db from "../db/connection.js"
import search from "../searchApp/search.js"


export default {
    async index(req, res){
        const conn = await db();
        if(Object.keys(req.query).length != 0){
            const {client, containerCode, status, category, type, searchReturn, groupBy} = req.query

            let filterReturn = searchReturn.split(",_")
            let filterInput = []
            let filterValue = []

            if(client){
                filterInput.push("client")
                filterValue.push(client)
            }

            if(containerCode){
                filterInput.push("container_code")
                filterValue.push(containerCode)
            }
            if(type){
                filterInput.push("type")
                filterValue.push(type)
            }
            if(status){
                filterInput.push("status")
                filterValue.push(status)
            }
            if(category){
                filterInput.push("category")
                filterValue.push(category)
            }


            let query = search.query("containers", filterReturn)
            query = search.where(query, filterInput)
            query = search.groupBy(query, groupBy)

            const [rows] = await conn.query(query, filterValue)
            
            return res.json(rows)
        }
        
        const query = "SELECT * FROM containers"

        const [rows] = await conn.query(query)

        return res.json(rows)
    },

    async indexOne(req, res){
        const {id} = req.params;

        const values = [id]

        const conn = await db()
        const query = "SELECT * FROM containers WHERE container_code=?"

        const [rows] = await conn.query(query, values)

        return res.json(rows)
    },
    async create(req, res){
        const {client, containerCode, type, status, category} = req.body

        const regex = /[A-Z]{4}[0-9]{7}/

        const validtypes = [20, 40]
        const validStatus = ["cheio", "vazio"]
        const validCategory = ["importação", "exportação"]

        const isValidTypes = validtypes.includes(type)
        const IsValidStatus = validStatus.includes(status)
        const isValidCategory = validCategory.includes(category)
        const isValidContainerCode = regex.exec(containerCode) 

        if(isValidCategory && isValidTypes && IsValidStatus && isValidContainerCode) {
            const conn = await db()

            const query = "INSERT INTO containers(client, container_code, type, status, category) VALUES(?, ?, ?, ?, ?)"
            const values = [client, containerCode, type, status, category]

            const result = await conn.query(query, values)
            return res.status(200).send()
        }

        return res.status(400).send()
    },

    async update(req, res){
        const {containerCode, client, status, type, category} = req.body

        const regex = /[A-Z]{4}[0-9]{7}/

        const validtypes = [20, 40]
        const validStatus = ["cheio", "vazio"]
        const validCategory = ["importação", "exportação"]

        const isValidTypes = validtypes.includes(type)
        const IsValidStatus = validStatus.includes(status)
        const isValidCategory = validCategory.includes(category)
        const isValidContainerCode = regex.exec(containerCode)
        
        if(isValidCategory && isValidTypes && IsValidStatus && isValidContainerCode) {
            const conn = await db()

            const query = "UPDATE containers SET client=?, type=?, status=?, category=?"
            const values = [client, type, status, category]

            const result = await conn.query(query, values)
            return res.status(202).send()
        }   
        return res.status(400).send()
    },

    async delete(req, res){
        const {id} = req.params

        const conn = await db()
        const query = "DELETE FROM containers WHERE container_code=?"
        const result = await conn.query(query, id)
        res.status(202).send()
    }
}