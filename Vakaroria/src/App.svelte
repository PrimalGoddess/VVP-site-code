<script>
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";
  import Main from "./lib/Main.svelte";
  import Games from "./lib/Games.svelte";
  import Forum from "./lib/Forum.svelte"; 
  import HigherLower from "./lib/HigherLower.svelte";
  
  import { visibleComponent } from "./lib/store";
  // main,games,forum,higherLower
</script>

<div class="container">
  <Header />
  <main class="p-2 border">
    {#if $visibleComponent === "main"}
      <Main />
    {/if}
    /*{#if $visibleComponent === "games"}
      <Games />
    {/if}
    {#if $visibleComponent === "forum"}
      <Forum />
    {/if}*/
    {#if $visibleComponent === "higherLower"}
      <HigherLower />
    {/if}*/
  </main>
  <Footer />
</div>