import {createConnection} from "./db"

export const checkJWTConnection = async (userID, tkn) => {

    try {

        const db = await createConnection();
        const sql = 'select * from user where idUser = ' + userID + ' ;'
        console.log(sql);
        
        const user = await db.query(sql); 
        console.log(user);
        

        try {
            let decoded = jwt.verify(tkn, user[0][0].password)

            console.log("decoded");
            console.log(decoded);
            
            if (decoded != undefined) return True
        } catch (e) { console.log(e); return NextResponse.json({ message: "Error", error: "Token expired" }, {status: 500}); }


    } catch (error) { console.log(error); return NextResponse.json({ message: "Error", error: "Verify userid and token" }, {status: 500}); }


    return False;
}
