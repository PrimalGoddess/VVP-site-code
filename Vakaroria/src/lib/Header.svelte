<script>
    import {
    visibleComponent,
} from "./store";
    const buttonPageGames = () => {
        // Open the mini-game area
        $visibleComponent = "games";
    };
    const buttonPageForum = () => {
        // Open the forum area
        $visibleComponent = "forum";
    };
    const buttonPageMain = () => {
        // Open the forum area
        $visibleComponent = "main";
    };
</script>

<header class="bg-success p-2">
    <h2 class="logo">Vakaroria</h2>
    <nav class="navigation">
        <a href="">Welcome</a>
        <a href="">Guild</a>
        <a href="">Den</a>
        <a href="">Labratory</a>
        <a href="">Market</a>
        <button 
            on:click={()=> {
                buttonPageGames()   
            }}>
            Mini-Games
            </button>
            <button 
            on:click={()=> {
                buttonPageForum()   
            }}>
            Forums
            </button>
        <a href="#">Library</a>
        <button class="btnLogin-popup">Login</button>
    </nav>
</header>