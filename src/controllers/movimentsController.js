import db from "../db/connection.js"
import search from "../searchApp/search.js"

export default {
    async index(req, res){

        const conn = await db()

        if(Object.keys(req.query).length != 0){
            const {containerCode, movimentType, join, groupBy, searchReturn} = req.query

            let filterReturn = searchReturn.split(",_")
            let filterInput = []
            let filterValue = []

            if(containerCode){
                filterInput.push("moviments.container_code")
                filterValue.push(containerCode)
            }
            if(movimentType){
                filterInput.push("moviments.movimentTypes")
                filterValue.push(movimentType)
            }


            let query = search.query("moviments", filterReturn)
            query = search.join(query, join, "container_code", "moviments")
            query = search.where(query, filterInput)
            query = search.groupBy(query, groupBy)

            const [rows] = await conn.query(query, filterValue)

            return res.json(rows)
            
        }

        const query = "SELECT * FROM moviments"
        const [rows] = await conn.query(query)

        return res.json(rows)
    },

    async indexOne(req, res){
        const {id} = req.params;
        const values = [id]
        const conn = await db()
        const query = "SELECT * FROM moviments WHERE id=?"

        const [rows] = await conn.query(query, values)
        return res.json(rows)
    },

    async create(req, res){
        let {containerCode, movimentType, dateInit, dateEnd} = req.body

        const validMoviments = ['embarque', 'descarga', 'gate in', 'gate out',
        'reposicionamento', 'pesagem', 'scanner']
        const regex = /[A-Z]{4}[0-9]{7}/

        const isValidContainerCode = regex.exec(containerCode)
        const isValidMoviments = validMoviments.includes(movimentType)

        dateInit = new Date(dateInit)
        dateEnd = new Date(dateEnd)

        const dateInitFormat = `${dateInit.getFullYear()}-${dateInit.getMonth() + 1}-${dateInit.getDate()} ${dateInit.getHours()}:${dateInit.getMinutes()}:${dateInit.getSeconds()}`
        const dateEndtFormat = `${dateEnd.getFullYear()}-${dateEnd.getMonth() + 1}-${dateEnd.getDate()} ${dateEnd.getHours()}:${dateEnd.getMinutes()}:${dateInit.getSeconds()}`


        if(isValidContainerCode && isValidMoviments){
            const conn = await db()

            const query = "INSERT INTO moviments(container_code, moviment_type, date_init, date_end) VALUES(?, ?, ?, ?)"
            const values = [containerCode, movimentType, dateInitFormat, dateEndtFormat];

            const result = conn.query(query, values)

           return res.status(200).send()
        }

        return res.status(400).send()

    },

    async update(req, res){
        let {containerCode, movimentType, dateInit, dateEnd} = req.body

        const validMoviments = ['embarque', 'descarga', 'gate in', 'gate out',
        'reposicionamento', 'pesagem', 'scanner']
        const regex = /[A-Z]{4}[0-9]{7}/

        const isValidContainerCode = regex.exec(containerCode)
        const isValidMoviments = validMoviments.includes(movimentType)

        dateInit = new Date(dateInit)
        dateEnd = new Date(dateEnd)

        const dateInitFormat = `${dateInit.getFullYear()}-${dateInit.getMonth() + 1}-${dateInit.getDate()} ${dateInit.getHours()}:${dateInit.getMinutes()}:${dateInit.getSeconds()}`
        const dateEndtFormat = `${dateEnd.getFullYear()}-${dateEnd.getMonth() + 1}-${dateEnd.getDate()} ${dateEnd.getHours()}:${dateEnd.getMinutes()}:${dateInit.getSeconds()}`


        if(isValidContainerCode && isValidMoviments){
            const conn = await db()

            const query = "UPDATE moviments SET container_code=?, moviment_type=?, date_init=?, dateEnd=?"
            const values = [containerCode, movimentType, dateInitFormat, dateEndtFormat];

            const result = conn.query(query, values)

           return res.status(202).send()
        }

        return res.status(400).send()
    },

    async delete(req, res){
        const {id} = req.params;
        const conn = await db()

        const query = "DELET FROM moviments WHERE id=?"
        const result = await conn.query(query, id)
        res.status(202).send()
    }
}