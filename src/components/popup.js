import React, { useRef } from 'react';
import Popup from "reactjs-popup"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"
import "../pages/cardGames.css"


const InstPopup = ({ins}) => {
    const ref = useRef();
     // eslint-disable-next-line
    const toggleTooltip = () => ref.current.toggle();
    const isPresent = useIsPresent
    
    return (
        <div>        
        <Popup        
        ref={ref}        
        trigger={          
        <button type="button" className="dealMe insBut">Instructions</button>}>
            
        <AnimatePresence>
  <motion.div layout
                    variants={{
                        hidden: (i) => ({
                            scale: 0,
                            y:100,
                            x: -1000
                        }),
                        visable: (i) => ({
                            scale: 1,
                            x: 0,
                            y: 0,
                            transition: {
                                delay: 0.025,
                            },
                        }),
                        removed: {
                            scale: 0
                        },
                    }}

                    initial="hidden"
                    animate="visable"
                    exit="removed"  
                    style={{
                        position: isPresent ? 'hidden' : 'visable '
                    }} 

                    
  className="popupClass" ><p>{ins.instruct}</p>
  
  </motion.div>
 </AnimatePresence> 
 </Popup>
 </div>
    )
}   
export default InstPopup               

