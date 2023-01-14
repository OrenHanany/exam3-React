import { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Meat from "../../model/meat";
import Group from "../../model/group";
import { getSelectUnstyledUtilityClass } from "@mui/base";


function Main(): JSX.Element {
    const [meat,setMeat]=useState<Meat[]>([]);
    const [group, setGroup] = useState<Group[]>([]);
    const [groupname,setgroupname]= useState('');
    const navigate= useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:3001/exam3/all")
        .then(response=>setMeat(response.data));
    },[])
    useEffect(() => {
        axios.get("http://localhost:3001/exam3/groups/all")
            .then(response => setGroup(response.data));
    },[])
    const getMeat = async (groupname:number) => {
        try {
            await axios.get(`http://localhost:3001/exam3/group/${groupname}`)
            .then(response=>setMeat(response.data))     
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <div className="Main">
			<Header/>
            <label>group</label>
            <select style={{ height: 30 }} onChange={(args)=>{getMeat(parseInt(args.target.value))}}>
                <option  selected disabled>Select group...</option>
                {group.map(item => <option key={item.id} value={item.id}>{item.group_name}</option>)}
            </select>
            <table>
                <thead>
                    <tr>
                        <th>group name</th>
                        <th>start date</th>
                        <th>end date</th>
                        <th>memo</th>
                        <th>room name</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {meat.map(item=>
                        <tr key={item.id}>
                            <td>{item.group_code}</td>
                            <td>{new Date(item.start_date).toLocaleString()}</td>
                            <td>{new Date(item.end_date).toLocaleString()}</td>
                            <td>{item.memo}</td>
                            <td>{item.room_name}</td>
                            <td><button onClick={()=>{
                                axios.delete(`http://localhost:3001/exam3/${item.id}`);
                                setMeat(meat.filter(single=>single.id !== item.id));
                            }}>❌</button></td>
                        </tr>
                        )}
                </tbody>
            </table>

        </div>
    );
}

export default Main ;
