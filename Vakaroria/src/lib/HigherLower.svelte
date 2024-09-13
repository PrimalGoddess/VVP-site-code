<script>
    import { visibleComponent } from "./store";

    const buttonPageGames = () => {
        // Open the higher lower game
        $visibleComponent = "games";
    }

    let knownNumber = Math.floor(Math.random() * 14 + 1)
    if(knownNumber == 1){
        knownNumber = 3
    }
    else if(knownNumber ==14){
        knownNumber = 12
    }
    let secretNumber = Math.floor(Math.random() * 15 + 1)
    let result;

    const isHigher = (guess) => {
        if(guess === "higher"){
            if(secretNumber > knownNumber){
                result = "You are right. The secret number was " + secretNumber + "."
            }
            else{
                result = "You are wrong. The secret number was " + secretNumber + "."
            } 
        }
        else{
            if(secretNumber < knownNumber){
                result = "You are right. The secret number was " + secretNumber + "."
            }
            else{
                result = "You are wrong. The secret number was " + secretNumber + "."
            } 
        }
        
    };
</script>

<p>
    Welcome to Higher Or Lower! <br>
    To play this game, you have to guess whether the secret number is higher or lower than that on the tile. <br> <br>


    Please imagine this to be a tile: {knownNumber} <br>
    Do you think the secret number is <button on:click={() => {isHigher("higher")}}>higher</button> or <button on:click={() => {isHigher("lower")}}>lower?</button> <br>

    {#if result != null}
        {result}
        <button on:click={buttonPageGames}>Replay</button>   
    {/if}
</p>
    
