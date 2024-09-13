<script>
    import 
    {
        visibleComponent
    } 
    from "./store";

    const buttonPageWelcome = () => {
        // Open the forum area
        $visibleComponent = "welcome";
    };
    const buttonPageGuild = () => {
        // Open the guild area
        $visibleComponent = "guild";
    };
    const buttonPageDen = () => {
        // Open the den - Remember to make this personal to the player
        $visibleComponent = "den";
    };
    const buttonPageLab = () => {
        // Open the lab - Remember to make this personal to the player
        $visibleComponent = "lab";
    };
    const buttonPageMarket = () => {
        // Open the market area
        $visibleComponent = "market";
    };
    const buttonPageGames = () => {
        // Open the mini-game area
        $visibleComponent = "games";
    };
    const buttonPageForum = () => {
        // Open the forum area
        $visibleComponent = "forum";
    };
    const buttonPageLibrary = () => {
        // Open the library
        $visibleComponent = "library";
    };
    const buttonPageLogin = () => {
        // Login
        $visibleComponent = "login";
    };
</script>

<style>
    
button {
  position: relative;
  font-size: 1.1em;
  color: #56ff67;
  text-decoration: none;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 3px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  background: transparent;
  border: 2.5px solid #6dcaff;
  border-style: groove;
  border-radius: 3px;
  box-shadow: 0 0 10px #00ffc8;
  backdrop-filter: blur(20px);
}
</style>

<header class="bg-success p-2">
    <h2 class="logo">Vakaroria</h2>
    <nav class="navigation">
        <button on:click={()=> {buttonPageWelcome()}}>
            Welcome
        </button>
        <button on:click={()=> {buttonPageGuild()}}>
            Guild
        </button>
        <button on:click={()=> {buttonPageDen()}}>
            Den
        </button>
        <button on:click={()=> {buttonPageLab()}}>
            Labratory
        </button>
        <button on:click={()=> {buttonPageMarket()}}>
            Market
        </button>
        <button on:click={()=> {buttonPageGames()}}>
            Mini-Games
        </button>
        <button on:click={()=> {buttonPageForum()}}>
            Forums
        </button>
        <button on:click={()=> {buttonPageLibrary()}}>
            Library
        </button>
        <button on:click={()=> {buttonPageLogin()}}>
            Login
        </button>
    </nav>
</header>