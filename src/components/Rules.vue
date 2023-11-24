<script setup lang="ts">
</script>

<template>
    <div class="rules-top">
        <h1 class="title-rules">Rules</h1>
        <div class="rules-container">
            <h1 class="western">General:</h1>
            <p class="text-line" style="margin-bottom: 0in">- The goal of the
                game is to eliminate the enemy players.</p>
            <p class="text-line" style="margin-bottom: 0in">- Games can be
                played in teams or as a free for all.</p>
            <p class="text-line" style="margin-bottom: 0in">- There are three
                unit types:</p>
            <ul>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">Infantry</p>
                    <ul>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">Shoots two
                                spaces unless otherwise stated and can get collateral kills</p>
                        </li>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">On the board,
                                these units are represented by dim lights</p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">Cavalry</p>
                    <ul>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">Attacks one
                                space.</p>
                        </li>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">On the board,
                                these units are represented by bright lights</p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">Artillery</p>
                    <ul>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">Attacks four
                                spaces away in the shape of a ‘+’ killing 5 spaces.</p>
                        </li>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">On the board,
                                these units are represented by blinking lights.</p>
                        </li>
                    </ul>
                </li>
            </ul>
            <p class="text-line" style="margin-bottom: 0in">- Walls are white
                and prevent movement, but allow attacks to go over.</p>
            <ul>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">On the board,
                        walls are represented by white or red green and blue lights</p>
                </li>
            </ul>
            <p class="text-line" style="margin-bottom: 0in">- Friendly fire is
                always enabled.</p>
            <ul>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">Infantry and
                        cavalry for the same player cannot friendly fire.</p>
                </li>
            </ul>
            <p class="text-line" style="margin-bottom: 0in"><br>

            </p>
            <h1 class="western">Cards:</h1>
            <p class="text-line" style="margin-bottom: 0in">- Players start with
                one bronze card and one silver card.</p>
            <p class="text-line" style="margin-bottom: 0in">- One ‘Move’,
                ‘Short Move’, and ‘Selective attack’ will always be face up
                and can be played any turn.</p>
            <ul>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">These will be
                        found in the bronze cards</p>
                </li>
            </ul>
            <p class="text-line" style="margin-bottom: 0in">- A single enemy
                kill allows the player to draw a bronze card.</p>
            <p class="text-line" style="margin-bottom: 0in">- A double kill in
                one sequence of events allows the player to draw a silver card.</p>
            <p class="text-line" style="margin-bottom: 0in">- A triple kill or
                higher in one sequence of events allows the player to draw a gold
                card.</p>
            <p class="text-line" style="margin-bottom: 0in">- Players can trade
                2 bronze for 1 silver, 3 bronze for 1 gold, 1 bronze and 1 silver
                for 1 gold, and 2 silver for 1 gold</p>
            <p class="text-line" style="margin-bottom: 0in">- Players may draw
                one bronze card at the end of each turn.</p>
            <p class="text-line" style="margin-bottom: 0in">- To play a card,
                the game will have a QR code scanner, activate the scanner with the
                button located on the opposite side of the scan port.</p>
            <p class="text-line" style="margin-bottom: 0in">- Cards are played
                in the future. If multiple cards are slated to play after a single
                turn, the cards will execute in the order they were played (whichever
                card was scanned first will play first, and the last, last).</p>
            <br>
            <h1 class="western">Controller:</h1>
            <p class="text-line" style="margin-bottom: 0in">- Controllers have
                three sections: ‘Turn’, ‘Unit’, ‘Direction’.</p>
            <ul>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">Turn: Labeled 0
                        – 5. Indicates after how many turns a card will be played.</p>
                    <ul>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">NOTE: ‘0’
                                will play after your turn. This means an enemy could have a card
                                played after your turn as well. HIS CARD WILL PLAY FIRST.</p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">Direction:
                        Tells the game which direction the card will play.</p>
                </li>
                <li>
                    <p class="text-line" style="margin-bottom: 0in">Unit: Indicates
                        which unit the card will play on.</p>
                    <ul>
                        <li>
                            <p class="text-line" style="margin-bottom: 0in">NOTE: Some
                                cards can only play on one unit type.</p>
                        </li>
                    </ul>
                </li>
            </ul>
            <p class="text-line" style="margin-bottom: 0in"><br>

        </p>
        <h1 class="western">Game setup:</h1>
        <p class="text-line" style="margin-bottom: 0in">You will need to
            play a map card before you can start a game.</p>
        <p class="text-line" style="margin-bottom: 0in">The controllers will
            start blinking with buttons you can press.</p>
        <ul>
            <li>
                <p class="text-line" style="margin-bottom: 0in">The ‘Turn’
                    section will show players/teams for each side. Mixed color indicates
                    those players are on a team. Colors that are not mixed are not on a
                    team.</p>
            </li>
            <li>
                <p class="text-line" style="margin-bottom: 0in">Press the
                    arrows to change team setup.</p>
            </li>
            <li>
                <p class="text-line" style="margin-bottom: 0in">When you can
                    play, the play button will blink indicating you can start.</p>
            </li>
        </ul>
        <br>
        <h1 class="western">Game play:</h1>
        <p class="text-line" style="margin-bottom: 0in">- Players:</p>
        <ul>
            <li>
                <p class="text-line" style="margin-bottom: 0in">Player 1: blue
                    and starts the game</p>
            </li>
            <li>
                <p class="text-line" style="margin-bottom: 0in">Player 2: red</p>
            </li>
            <li>
                <p class="text-line" style="margin-bottom: 0in">Player 3: green</p>
            </li>
            <li>
                <p class="text-line" style="margin-bottom: 0in">Player 4:
                    purple</p>
            </li>
        </ul>
        <p class="text-line" style="margin-bottom: 0in">- Each player will
            play one card for his turn.</p>
        <p class="text-line" style="margin-bottom: 0in">- The controller
            will glow with whatever color the current players turn is.</p>
        <p class="text-line" style="margin-bottom: 0in">- Once a card is
            scanned, the controller will blink with what you can select.</p>
        <p class="text-line" style="margin-bottom: 0in">- Once all selection
            have been made, the play button will blink.</p>
        <p class="text-line" style="margin-bottom: 0in">- If you want to
            hide your play, you can hit the ‘hide’ button. This will hide
            your selection but will still blink the play button when ready.</p>
    </div>

</div></template>

<style type="text/css">
.text-line {
    /* padding-bottom: 5px; */
}
.rules-container {
    padding: 50px;
}
.title-rules {
    text-align: center;
}
.rules-top {
    /* background: #181818; */
}

h1 {
    margin-bottom: 0.08in;
    background: transparent;
    page-break-after: avoid
}

h1.western {
    font-family: "Liberation Sans", sans-serif;
    font-size: 18pt;
    font-weight: bold
}

h1.cjk {
    font-family: "Microsoft YaHei";
    font-size: 18pt;
    font-weight: bold
}

h1.ctl {
    font-family: "Arial";
    font-size: 18pt;
    font-weight: bold
}

a:link {
    color: #000080;
    text-decoration: underline
}
</style>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Rules',
    data() {

    },
    methods: {

    }
})
</script>
