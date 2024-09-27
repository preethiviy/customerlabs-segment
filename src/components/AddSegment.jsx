import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

const map = {
    first_name: {"first_name": "First Name"},
    last_name: {"last_name": "Last Name"},
    gender: {"gender": "Gender"},
    age: {"age": "Age"},
    account_name: {"account_name": "Account Name"},
    city: {"city": "City"},
    state: {"state": "State"}
}

const options = [
    {
        label: "First Name", value: "first_name",
    },
    {
        label: "Last Name", value: "last_name",
    },
    {
        label: "Gender", value: "gender",
    },
    {
        label: "Age", value: "age",
    },
    {
        label: "Account Name", value: "account_name",
    },
    {
        label: "City", value: "city",
    },
    {
        label: "State", value: "state",
    }
]

const AddSegment = ({toggleDrawer}) => {
    const [temp, setTemp] = useState("");
    const [keys, setKeys] = useState([]);

    const [toAdd, setToAdd] = useState({
        segment_name: "",
        schema: []
    })

    const handleAddToSchema = () => {
        if(temp){
            let obj = {...toAdd};
            obj.schema.push(map[temp]);
            setToAdd(obj);
        }

        setTemp("");
    }

    const handleChangeSchema = (e, index) => {
        let obj = {...toAdd};
        obj.schema[index] = map[e.target.value];
        setToAdd(obj);
    }

    useEffect(() => {
        if(toAdd.schema.length > 0){
            let obj = toAdd.schema?.reduce((acc, obj) => {
                acc.push(Object.keys(obj)[0]);
                return acc;
            }, [])
            setKeys(obj);
        }else{
            setKeys([]);
        }
    }, [toAdd]);

    const handleSubmit = async (e) => {
        try {
            await axios.post(
                "https://webhook.site/75ca9491-4999-4a87-8d0c-7484028b32a5",
                toAdd,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Data sent successfully!');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };


    return (
        <div className='flex flex-col h-full'>
            <div className='w-full bg-cyan-500 text-white'>
                <div className="w-full h-[80px] p-4 flex gap-x-3 items-center">
                    <button className="hover:bg-slate-200/40 p-2 rounded-full transition-all duration-150 ease-in-out" onClick={toggleDrawer(false)}>
                        <FaAngleLeft className="text-xl" />
                    </button>
                    <p className="text-lg">Saving Segment</p>
                </div>
            </div>
            <div className='w-full flex-1 overflow-y-scroll p-6 flex flex-col items-start gap-y-4'>
                <form className="flex flex-col items-start gap-y-4">
                    <div className="w-full flex flex-col gap-y-2">
                        <label className="font-medium">Enter the Name of the Segment</label>
                        <input 
                            value={toAdd.segment_name} 
                            onChange={(e) => setToAdd({...toAdd, segment_name: e.target.value})} 
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                            placeholder="Segment name..."
                        />
                    </div>
                    <p>To save your segment, you need to add the schemas to build the query</p>
                    {
                        toAdd.schema?.map((item, index) => 
                            <div className="w-full" key={index}>
                                <select 
                                    value={Object.keys(toAdd.schema[index])[0]} 
                                    onChange={(e) => handleChangeSchema(e, index)} 
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                                    {
                                        options.map((option, index1) =>
                                            <option 
                                                hidden={Object.keys(toAdd.schema[index])[0] === option.value} 
                                                key={index1} 
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>
                        )
                    }
                    
                </form>

                {
                    toAdd.schema.length > 0 && 
                    <div className="w-full">
                        <hr className="bg-blue-500 h-0.5 border-none" />
                    </div>
                }

                <div className="w-full">
                    <select 
                        value={temp} 
                        onChange={(e) => setTemp(e.target.value)}  
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                        <option disabled defaultValue value="">Add schema to segment</option>
                        {
                            options.filter((option) => !keys.includes(option.value)).map((option, index) =>
                                <option key={index} value={option.value}>{option.label}</option>
                            )
                        }
                    </select>
                </div>
                <button type="button" onClick={handleAddToSchema} className="text-green-500 underline">+Add new schema</button>
            </div>
            <div className='w-full bg-slate-200 text-white'>
                <div className="w-full h-[80px] p-4 flex gap-x-3 items-center">
                    <button onClick={handleSubmit} className="bg-green-500 text-sm px-3 py-2 text-white rounded-md hover:bg-green-400 transition-all duration-150 ease-in-out">Save the segment</button>
                    <button onClick={toggleDrawer(false)} className="bg-white text-sm px-3 py-2 text-red-500 rounded-md hover:bg-slate-100 transition-all duration-150 ease-in-out">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddSegment