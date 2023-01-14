import dal from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import Group from "../Models/Group"
import Meat from "../Models/Meat";
//add meat
const addMeat = async (meat: Meat): Promise<Meat> => {
    // command line for the DB
    const sql = `
    INSERT INTO exam3.meat (group_code, start_date, end_date, memo, room_name) VALUES 
    (${meat.group_code}, 
    '${meat.start_date}', 
    '${meat.end_date}', 
    '${meat.memo}', 
    '${meat.room_name}')`;


    const response: OkPacket = await dal.execute(sql);
    meat.id = response.insertId;
    return meat;
}


//delete student
const deleteMeat = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM Meat WHERE id=${id}`
    const response = await dal.execute(sql);
    
}

//all students
const getAllMeat = async (): Promise<Meat[]> => {
    // command line for the DB
    const sql = `
        SELECT exam3.meat.* , exam3.groups.group_name AS group_code
        FROM exam3.meat JOIN exam3.groups
        ON exam3.meat.group_code = exam3.groups.id
    `;
    // a promise function that connects us to the database with the command line
    const meat = await dal.execute(sql);
    return meat;
}

const getAllbygroup = async (groupcode:number): Promise<void> => {
    const sql =`
    SELECT exam3.meat.* , exam3.groups.group_name AS group_code
    FROM exam3.meat JOIN exam3.groups
    ON exam3.meat.group_code = exam3.groups.id
    WHERE exam3.meat.group_code=${groupcode}
    `
    const meat = await dal.execute(sql);
    return meat;
}
//single students
const getSingleMeat = async (id:number): Promise<Meat> => {
    // command line for the DB
    const sql =  `
        SELECT exam3.meat.* , exam3.groups.group_name AS group_code
        FROM exam3.meat JOIN exam3.groups
        ON exam3.meat.group_code = exam3.groups.id
        WHERE exam3.meat.id=${id}
        `;
    // a promise function that connects us to the database with the command line
    const meat = await dal.execute(sql);
    return meat;
}

const getAllGroups = async():Promise<Group[]> =>{
    const sql = "SELECT * FROM exam3.groups";
    const group = await dal.execute(sql);
    return group;
}

export default{
    addMeat,
    deleteMeat,
    getAllMeat,
    getSingleMeat,
    getAllGroups,
    getAllbygroup
}
