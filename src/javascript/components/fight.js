import controls from '../../constants/controls';
import hotkeys from 'hotkeys-js';
export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {


        const healthBarFirst = document.getElementById('left-fighter-indicator')
        const healthBarSecond = document.getElementById('right-fighter-indicator')

        healthBarFirst.style.width = firstFighter.health + "%";
        healthBarSecond.style.width = secondFighter.health + "%";

        let timerPlayerOne
        let timerPlayerTwo
        hotkeys("a,j,q+w+e,u+i+o,l+a,d+j", { keyup: true }, function (event, handler) {
            switch (handler.key) {

                case "q+w+e":
                    if (!timerPlayerOne) {
                        let health = (healthBarSecond.offsetWidth - (2 * firstFighter.attack))
                        if (health < 0) {
                            healthBarSecond.style.width = 0
                        }
                        healthBarSecond.style.width = health + "px"
                        checkForWin(healthBarSecond.style.width, firstFighter)
                        timerPlayerOne = setTimeout(() => (timerPlayerOne = clearTimeout(timerPlayerOne)), 10000);
                    }
                    break;
                case "u+i+o":
                    if (!timerPlayerTwo) {
                        let health = (healthBarFirst.offsetWidth - (2 * secondFighter.attack))
                        if (health < 0) {
                            healthBarFirst.style.width = 0
                        }
                        healthBarFirst.style.width = health + "px"
                        checkForWin(healthBarFirst.style.width, secondFighter)
                        timerPlayerTwo = setTimeout(() => (timerPlayerTwo = clearTimeout(timerPlayerTwo)), 10000);
                    }
                    break;
                case "l+a":
                    const demageOne = getDamage(firstFighter, secondFighter)
                    let healthSecond = (healthBarSecond.offsetWidth - demageOne)
                    if (healthSecond < 0) {
                        healthBarSecond.style.width = 0
                    }
                    healthBarSecond.style.width = healthSecond + "px"
                    checkForWin(healthBarSecond.style.width, firstFighter)
                    break;
                case "d+j":
                    const demageSecond = getDamage(secondFighter, firstFighter)
                    let healthFirst = (healthBarFirst.offsetWidth - demageSecond)
                    if (healthFirst < 0) {
                        healthBarFirst.style.width = 0
                    }

                    healthBarFirst.style.width = healthFirst + "px"
                    checkForWin(healthBarSecond.style.width, secondFighter)
                    break;
                case "a":
                    const demageA = getDamage(firstFighter, undefined)

                    let healthA = (healthBarSecond.offsetWidth - demageA)
                    if (healthA < 0) {
                        healthBarSecond.style.width = 0
                    }
                    healthBarSecond.style.width = healthA + "px"
                    checkForWin(healthBarSecond.style.width, firstFighter)
                    break;
                case "j":
                    const demage = getDamage(secondFighter, undefined)
                    let health = (healthBarFirst.offsetWidth - demage)
                    if (health < 0) {
                        healthBarFirst.style.width = 0
                    }
                    healthBarFirst.style.width = health + "px"
                    checkForWin(healthBarFirst.style.width, secondFighter)
                    break;
            }
        });

        function checkForWin(health, winFighter) {
            if (health === '0px') { resolve(winFighter) }
        }
        // resolve the promise with the winner when fight is over
    });
}
export function getDamage(attacker, defender) {
    // return damage

    let damege = getHitPower(attacker) - getBlockPower(defender)
    damege = damege < 0 ? 0 : damege
    return damege
}

export function getHitPower(fighter) {
    // return hit power
    const attack = fighter.attack
    const criticalHitChance = Math.random() * 2
    const power = attack * criticalHitChance
    return power
}

export function getBlockPower(fighter) {
    // return block power
    let power
    if (fighter === undefined) {
        return power = 0
    }
    const defense = fighter.defense
    const dodgeChance = Math.random() * 2
    power = defense * dodgeChance
       return power
}
