import './Light.css';
import { useState } from 'react';
import { motion } from 'motion/react';
export function Light({color, rotation, onClick, count}) {

    return (
        <motion.div 
        className="light" 
        style={{ backgroundColor: color }} 
        onClick={onClick}
        animate={{ rotate: -rotation }}
        >
            {count}
        </motion.div>
    )
}