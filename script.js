const boxes = document.querySelectorAll('.box');
        const resetButton = document.getElementById('reset-button');
        const newGameButton = document.getElementById('new-button');
        const msgContainer = document.getElementById('msg-container');
        const msg = document.getElementById('msg');

        let turnO = true; // True for 'O', false for 'X'

        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const resetGame = () => {
            turnO = true;
            boxes.forEach(box => {
                box.textContent = '';
                box.disabled = false;
            });
            msgContainer.classList.remove('show');
        };

        const checkWinner = () => {
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (
                    boxes[a].textContent &&
                    boxes[a].textContent === boxes[b].textContent &&
                    boxes[a].textContent === boxes[c].textContent
                ) {
                    showWinner(boxes[a].textContent);
                    return;
                }
            }
            if ([...boxes].every(box => box.textContent)) {
                showWinner('No one');
            }
        };

        const showWinner = (winner) => {
            msg.textContent = `Congratulations, Winner is ${winner} !`;
            msgContainer.classList.add('show');
            boxes.forEach(box => (box.disabled = true));
        };

        boxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                box.textContent = turnO ? 'O' : 'X';
                box.disabled = true;
                turnO = !turnO;
                checkWinner();
            });
        });

        resetButton.addEventListener('click', resetGame);
        newGameButton.addEventListener('click', resetGame);