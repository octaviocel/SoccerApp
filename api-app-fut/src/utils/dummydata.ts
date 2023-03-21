import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

async function checkIfRolExist(client: Client, data: any): Promise<boolean> {
    //console.log(data)
    const result = await client.query(
        `SELECT * FROM rol WHERE descripcion=$1`,
        [data.descripcion],
    );
    // console.log(result)
    return result.rows.length ? result.rows[0] : null;
}

async function checkIfUserExist(client: Client, data: any): Promise<boolean> {
    const result = await client.query(
        `SELECT * FROM usuario WHERE email=$1`,
        [data.email],
    );
    return result.rows.length ? result.rows[0] : null;
}

export async function createDummyData() {
    try {
        const client = new Client({
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });

        await client.connect();


        const Rolexists = await checkIfRolExist(client, { descripcion: 'ADMINISTRADOR' });
        const Rol2exists = await checkIfRolExist(client, { descripcion: 'USUARIO' });
        const Rol3exists = await checkIfRolExist(client, { descripcion: 'ARBITRO' });
        const userExist = await checkIfUserExist(client, { email: 'admin@gmail.com' })

        if (!Rolexists) {
            // si el conjunto de datos no existe, se inserta en la base de datos
            const rol = await client.query(`INSERT INTO rol (descripcion) VALUES ($1)`, ['ADMINISTRADOR']);

            console.log(`Data inserted: rol 1`);
        }
        if (!Rol2exists) {
            // si el conjunto de datos no existe, se inserta en la base de datos
            const rol = await client.query(`INSERT INTO rol (descripcion) VALUES ($1)`, ['USUARIO']);
            console.log(`Data inserted: rol 2`);
        }
        if (!Rol3exists) {
            // si el conjunto de datos no existe, se inserta en la base de datos
            const rol = await client.query(`INSERT INTO rol (descripcion) VALUES ($1)`, ['ARBITRO']);
            console.log(`Data inserted: rol 3`);
        }
        if (!userExist) {
            const user = await client.query(`INSERT INTO USUARIO (NOMBRE,APEPAT,APEMAT,EMAIL,PASSWORD,ROL_ID) VALUES ($1,$2,$3,$4,$5,$6)`,
                ['Admin','Admin','','admin@gmail.com', bcrypt.hashSync('123', 10), 1])
            console.log(`Data inserted: user root`);
        }


        await client.end();
    } catch (error) {
        console.log(error)
        console.log("Error en la creacion de DummyData")
    }

}