function startGame() {
    const number1 = parseInt(document.getElementById('number1').value);
    const number2 = parseInt(document.getElementById('number2').value);
    const operationType = document.getElementById('operationType').value;

    // إعداد قائمة العمليات
    const operations = generateOperations(number1, number2, operationType);

    // عرض العمليات
    displayOperations(operations);

    // عند الضغط على زر النتيجة
    const calculateButton = document.createElement('button');
    calculateButton.textContent = 'Calculate';
    calculateButton.onclick = () => {
        const score = calculateScore(operations);
        const gameResult = document.getElementById('gameResult');
        gameResult.textContent = `score: ${score} / ${number2}`;
    };

    const gameResult = document.getElementById('gameResult');
    gameResult.innerHTML = '';
    gameResult.appendChild(calculateButton);
}

// دالة لإنشاء العمليات بناءً على الرقمين ونوع العملية
function generateOperations(number1, number2, operationType) {
    const operations = [];

    for (let i = 0; i < number2; i++) {
        const operation = {
            number1: number1,
            number2: getRandomNumber(),
            operationType: operationType,
            userAnswer: null,
            correctAnswer: null,
        };

        operation.correctAnswer =
            operationType === '+'
                ? operation.number1 + operation.number2
                : operation.number1 * operation.number2;

        operations.push(operation);
    }

    return operations;
}

// دالة عشوائية للحصول على رقم بين 1 و 10
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// دالة لعرض العمليات
function displayOperations(operations) {
    const operationsContainer = document.getElementById('operationsContainer');
    operationsContainer.innerHTML = '';

    operations.forEach((operation, index) => {
        const operationText = document.createElement('p');
        operationText.textContent = ` ${index + 1}: ${operation.number1} ${
            operation.operationType
        } ${operation.number2} = `;

        const answerInput = document.createElement('input');
        answerInput.type = 'number';
        answerInput.addEventListener('input', (event) => {
            operation.userAnswer = parseInt(event.target.value);
        });

        operationsContainer.appendChild(operationText);
        operationsContainer.appendChild(answerInput);
    });
}

// دالة لحساب النتيجة
function calculateScore(operations) {
    let score = 0;

    operations.forEach((operation) => {
        if (operation.userAnswer === operation.correctAnswer) {
            score++;
        }
    });

    return score;
}

