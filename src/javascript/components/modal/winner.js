import showModal from './modal';
import { createFighterImage } from '../fighterPreview'
export function showWinnerModal(fighter) {
    // call showModal function
    
   
    const imgElement = fighter !== undefined ? createFighterImage(fighter) : ""

    const winerModal = {
        title:fighter.name,
        bodyElement:imgElement,
        
    }
    
    showModal (winerModal)
}
