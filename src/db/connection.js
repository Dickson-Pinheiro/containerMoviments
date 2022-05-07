import db from "mysql2/promise"

async function connect(){
    
    if(global.connection && global.connection.state != "desconnected"){
        return global.connection
    }
    
    const connection = await db.createConnection({
        host: "localhost",
        user: "root",
        database: "porto",
        password: "2013101110@Vi" 
        })
        
    global.connection = connection;
    return connection;
}

export default connect;