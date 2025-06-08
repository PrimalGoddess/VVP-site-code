<script>
        import { visibleComponent } from "./store";
        const buttonPageHigherLower = () => {
        // Open the higher lower game
        $visibleComponent = "higherLower";
    };

        const buttonPageSudoku = () => {
        // Open the sudoku game
        $visibleComponent = "sudoku";
    };
</script>

<button on:click={buttonPageHigherLower}>Play Higher or Lower</button>
<button on:click={buttonPageSudoku}>Play Sudoku</button>
