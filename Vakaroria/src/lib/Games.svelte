<script>
        import { visibleComponent } from "./store";
        const buttonPageHigherLower = () => {
        // Open the higher lower game
        $visibleComponent = "higherLower";
    };
</script>

<button on:click={buttonPageHigherLower}>Play Higher or Lower</button>