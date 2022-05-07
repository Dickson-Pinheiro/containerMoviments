import { join } from "path";

export default {
    query(table, columns){
        let campos = ""

        columns.forEach(col => {
            campos += col + " "
        });

        campos = campos.trim()
        campos = campos.replace(/ /g, ", ")

        const query = "SELECT " + campos + " FROM " + table;
        return query;
    },
    
    where(query, columns=[]){

        if(columns.length != 0){
            let queryWhere = ""

            colums.forEach(col => {
                queryWhere += col + "=?" + " "
            })

            queryWhere = queryWhere.trim()
            queryWhere = queryWhere.replace(/ /g, ", ")

            const queryEnd = query + " WHERE " + queryWhere
            return queryEnd
        }
        return query;
    },

    join(query, join="", foreignKey, table){
        if(join){
            let queryJoin = ` JOIN ${join} on ${join}.${foreignKey} = ${table}.${foreignKey}`
            return query + queryJoin 
        }
        return query;
    },

    groupBy(query, column=""){
        if(column)
            return query + " GROUP BY " + column
        return query
    }
}