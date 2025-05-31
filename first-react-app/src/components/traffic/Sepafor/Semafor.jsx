import { Light } from "../Light/Light";
import { FaArrowRotateRight } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "motion/react"
import { FaRegTrashAlt } from "react-icons/fa";
import './Semafor.css';
export default function Semafor() {
    const [rotation, setRotation] = useState(0);
    const [lightCount, setLightCount] = useState({
        red: 0,
        yellow: 0,
        green: 0
    }); // [red, yellow, green]
    const resetCount=()=>{
        setLightCount({
            red: 0,
            yellow: 0,
            green: 0
        });
    }
    return (
        <motion.div className="semafor" animate={{ rotate: rotation }}>
            <Light
                onClick={() =>
                    setLightCount(prev => ({
                        ...prev,
                        red: prev.red + 1
                    }))
                }
                count={lightCount.red}
                rotation={rotation}
                color={'red'}
            />
            <Light
                onClick={() =>
                    setLightCount(prev => ({
                        ...prev,
                        yellow: prev.yellow + 1
                    }))
                }
                count={lightCount.yellow}
                rotation={rotation}
                color={'yellow'} />
            <Light
                onClick={() =>
                    setLightCount(prev => ({
                        ...prev,
                        green: prev.green + 1
                    }))
                }
                count={lightCount.green}
                rotation={rotation}
                color={'green'} />
            <span style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <motion.button onClick={() => setRotation(rotation + 90)} animate={{ rotate: -rotation }}>
                    <FaArrowRotateRight />
                </motion.button>
                <motion.button onClick={resetCount} animate={{ rotate: -rotation }}>
                    <FaRegTrashAlt />
                </motion.button>
            </span>
        </motion.div>
    )
}