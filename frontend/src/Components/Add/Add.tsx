import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Add.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Group from "../../model/group";
import Meat from "../../model/meat";

function Add(): JSX.Element {
    const [group, setGroup] = useState<Group[]>([]);
    const { register, handleSubmit } = useForm<Meat>();
    const navigate = useNavigate();
    const params = useParams();
    const [meat,setMeat] = useState<Meat>();
    const id = +(params.id || 0);
    useEffect(() => {
        axios.get("http://localhost:3001/exam3/groups/all")
            .then(response => setGroup(response.data));
            if (id>0){
                axios.get(`http://localhost:3001/exam3/${params.id}`) 
                .then(response=>{                    
                    setMeat(response.data[0]);
                });       
            }
        
    },[])

    const send = async (newMeat: Meat) => {
        try {
                await axios.post("http://localhost:3001/exam3/add",newMeat)
                .then(res=>navigate("/"));
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <div className="Add">
            <Header />
            <div className="Box">
                <form onSubmit={handleSubmit(send)}>
                    <h2>Add Meat</h2>

                    <label>group</label>
                    <select required style={{ height: 30 }} {...register("group_code")}>
                        <option selected disabled value="">Select group...</option>
                        {group.map(item => <option key={item.id} value={item.id}>{item.group_name}</option>)}
                    </select>

                    <label>Start Date:</label>
                    <input required
                     type="datetime-local" {...register("start_date")}/>

                    <label>End Date:</label>
                    <input required
                     type="datetime-local" {...register("end_date")}/>

                    <label>Memo:</label>
                    <input required type="text"  {...register("memo")}/>

                    <label>room name:</label>
                    <input required type="text"  {...register("room_name")}/>

                    <input type="submit" value="save Meat" style={{ height: 50, backgroundColor: "lightgreen", borderRadius: 20 }} />
                </form>
            </div>
        </div>
    );
}

export default Add;
