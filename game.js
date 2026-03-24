// ============================================
// BODMAS BUS EXPRESS - COMPLETE GAME LOGIC
// ============================================

// ========== GAME STATE ==========
let gameState = {
    playerName: '',
    playerAvatar: '👦',
    score: 0,
    currentLevel: 1,
    currentExpressionIndex: 0,
    currentStep: 0,
    streak: 0,
    mistakes: 0,
    hintsUsed: 0,
    expressions: [],
    currentExpression: null,
    steps: [],
    completed: false
};

// ========== LEVEL CONFIGURATION ==========
const levelConfig = {
    1: {
        name: 'Beginner',
        operations: ['×', '÷'],
        bracketTypes: 'none',
        numberRange: { min: 1, max: 20 },
        expressionsCount: 5,
        milestone: 'busstop'
    },
    2: {
        name: 'Easy',
        operations: ['+', '-', '×', '÷'],
        bracketTypes: 'none',
        numberRange: { min: 1, max: 50 },
        expressionsCount: 5,
        milestone: 'school'
    },
    3: {
        name: 'Medium',
        operations: ['+', '-', '×', '÷'],
        bracketTypes: 'round',
        numberRange: { min: 10, max: 99 },
        expressionsCount: 5,
        milestone: 'park'
    },
    4: {
        name: 'Advanced',
        operations: ['+', '-', '×', '÷'],
        bracketTypes: 'square',
        numberRange: { min: 10, max: 999 },
        expressionsCount: 5,
        milestone: 'park'
    },
    5: {
        name: 'Expert',
        operations: ['+', '-', '×', '÷'],
        bracketTypes: 'curly',
        numberRange: { min: 100, max: 9999 },
        expressionsCount: 5,
        milestone: 'picnic'
    }
};

// ========== EXPRESSIONS DATABASE ==========
const expressionsDB = {
    1: [
        { text: "4 × 3 ÷ 2", answer: 6, steps: ["Multiply 4 × 3 = 12", "Divide 12 ÷ 2 = 6"] },
        { text: "12 ÷ 3 × 2", answer: 8, steps: ["Divide 12 ÷ 3 = 4", "Multiply 4 × 2 = 8"] },
        { text: "8 × 2 ÷ 4", answer: 4, steps: ["Multiply 8 × 2 = 16", "Divide 16 ÷ 4 = 4"] },
        { text: "15 ÷ 5 × 3", answer: 9, steps: ["Divide 15 ÷ 5 = 3", "Multiply 3 × 3 = 9"] },
        { text: "6 × 4 ÷ 8", answer: 3, steps: ["Multiply 6 × 4 = 24", "Divide 24 ÷ 8 = 3"] }
    ],
    2: [
        { text: "5 + 3 × 2", answer: 11, steps: ["Multiply 3 × 2 = 6", "Add 5 + 6 = 11"] },
        { text: "12 ÷ 4 + 3 - 1", answer: 5, steps: ["Divide 12 ÷ 4 = 3", "Add 3 + 3 = 6", "Subtract 6 - 1 = 5"] },
        { text: "8 × 2 - 6 ÷ 3", answer: 14, steps: ["Multiply 8 × 2 = 16", "Divide 6 ÷ 3 = 2", "Subtract 16 - 2 = 14"] },
        { text: "15 - 3 × 2 + 4", answer: 13, steps: ["Multiply 3 × 2 = 6", "Subtract 15 - 6 = 9", "Add 9 + 4 = 13"] },
        { text: "20 ÷ 5 + 3 × 2", answer: 10, steps: ["Divide 20 ÷ 5 = 4", "Multiply 3 × 2 = 6", "Add 4 + 6 = 10"] }
    ],
    3: [
        { text: "(15 + 7) × 3", answer: 66, steps: ["Add inside brackets: 15 + 7 = 22", "Multiply 22 × 3 = 66"] },
        { text: "24 ÷ (8 - 2) + 5", answer: 9, steps: ["Subtract inside brackets: 8 - 2 = 6", "Divide 24 ÷ 6 = 4", "Add 4 + 5 = 9"] },
        { text: "(30 - 12) × 2 + 8", answer: 44, steps: ["Subtract inside brackets: 30 - 12 = 18", "Multiply 18 × 2 = 36", "Add 36 + 8 = 44"] },
        { text: "42 ÷ (6 + 1) - 3", answer: 3, steps: ["Add inside brackets: 6 + 1 = 7", "Divide 42 ÷ 7 = 6", "Subtract 6 - 3 = 3"] },
        { text: "(25 - 10) × 4 ÷ 5", answer: 12, steps: ["Subtract inside brackets: 25 - 10 = 15", "Multiply 15 × 4 = 60", "Divide 60 ÷ 5 = 12"] }
    ],
    4: [
        { text: "[5 × (3 + 2)] - 4", answer: 21, steps: ["Solve inner brackets: 3 + 2 = 5", "Multiply 5 × 5 = 25", "Subtract 25 - 4 = 21"] },
        { text: "{20 ÷ (5 - 3)} + 6", answer: 16, steps: ["Solve inner brackets: 5 - 3 = 2", "Divide 20 ÷ 2 = 10", "Add 10 + 6 = 16"] },
        { text: "[(15 - 7) × 3] + 12", answer: 36, steps: ["Solve inner brackets: 15 - 7 = 8", "Multiply 8 × 3 = 24", "Add 24 + 12 = 36"] },
        { text: "[42 ÷ (8 - 1)] × 2", answer: 12, steps: ["Solve inner brackets: 8 - 1 = 7", "Divide 42 ÷ 7 = 6", "Multiply 6 × 2 = 12"] },
        { text: "{36 ÷ (9 - 3)} + 15", answer: 21, steps: ["Solve inner brackets: 9 - 3 = 6", "Divide 36 ÷ 6 = 6", "Add 6 + 15 = 21"] }
    ],
    5: [
        { text: "{[(25 - 10) × 3] ÷ 5} + 12", answer: 21, steps: ["Solve innermost: 25 - 10 = 15", "Multiply 15 × 3 = 45", "Divide 45 ÷ 5 = 9", "Add 9 + 12 = 21"] },
        { text: "[45 ÷ (3 + 6)] × {8 - 2}", answer: 30, steps: ["Add: 3 + 6 = 9", "Divide 45 ÷ 9 = 5", "Subtract: 8 - 2 = 6", "Multiply 5 × 6 = 30"] },
        { text: "(120 + 80) ÷ [5 × (10 - 6)]", answer: 10, steps: ["Add: 120 + 80 = 200", "Subtract: 10 - 6 = 4", "Multiply: 5 × 4 = 20", "Divide: 200 ÷ 20 = 10"] },
        { text: "{[48 ÷ (12 - 4)] × 3} - 5", answer: 13, steps: ["Subtract: 12 - 4 = 8", "Divide: 48 ÷ 8 = 6", "Multiply: 6 × 3 = 18", "Subtract: 18 - 5 = 13"] },
        { text: "(256 ÷ 4) + [18 × (3 + 2)] - 15", answer: 139, steps: ["Divide: 256 ÷ 4 = 64", "Add: 3 + 2 = 5", "Multiply: 18 × 5 = 90", "Add: 64 + 90 = 154", "Subtract: 154 - 15 = 139"] }
    ]
};

// ========== BODMAS ENGINE ==========
class BODMASEngine {
    static getNextOperation(expression) {
    // ========== CHECK FOR ALL BRACKET TYPES SEPARATELY ==========
    // Check for Round Brackets ( ) - Highest priority
    if (expression.includes('(')) {
        let bracketMatch = this.findInnermostBracket(expression);
        if (bracketMatch && bracketMatch.openChar === '(') {
            return { type: 'round_bracket', priority: 1, bracketType: 'round', bracketInfo: bracketMatch };
        }
        return { type: 'round_bracket', priority: 1, bracketType: 'round' };
    }
    
    // Check for Square Brackets [ ]
    if (expression.includes('[')) {
        let bracketMatch = this.findInnermostBracket(expression);
        if (bracketMatch && bracketMatch.openChar === '[') {
            return { type: 'square_bracket', priority: 1, bracketType: 'square', bracketInfo: bracketMatch };
        }
        return { type: 'square_bracket', priority: 1, bracketType: 'square' };
    }
    
    // Check for Curly Brackets { }
    if (expression.includes('{')) {
        let bracketMatch = this.findInnermostBracket(expression);
        if (bracketMatch && bracketMatch.openChar === '{') {
            return { type: 'curly_bracket', priority: 1, bracketType: 'curly', bracketInfo: bracketMatch };
        }
        return { type: 'curly_bracket', priority: 1, bracketType: 'curly' };
    }
    
    // Check for × and ÷ (left to right)
    const mulDivMatch = expression.match(/[×÷]/);
    if (mulDivMatch) {
        return { type: mulDivMatch[0], priority: 2, operator: mulDivMatch[0] };
    }
    
    // Check for + and - (left to right)
    const addSubMatch = expression.match(/[+-]/);
    if (addSubMatch) {
        return { type: addSubMatch[0], priority: 3, operator: addSubMatch[0] };
    }
    
    return null;
}
    
    static solveStep(expression, operationInfo) {
    // Handle different bracket types
    if (operationInfo.type === 'round_bracket' || 
        operationInfo.type === 'square_bracket' || 
        operationInfo.type === 'curly_bracket') {
        
        let bracketMatch = operationInfo.bracketInfo || this.findInnermostBracket(expression);
        
        if (bracketMatch) {
            let innerValue = this.evaluateExpression(bracketMatch.inner);
            let newExpr = expression.replace(bracketMatch.full, innerValue);
            
            let bracketDisplay = '';
            if (bracketMatch.bracketType === 'round') bracketDisplay = '( )';
            else if (bracketMatch.bracketType === 'square') bracketDisplay = '[ ]';
            else bracketDisplay = '{ }';
            
            return { 
                newExpression: newExpr, 
                result: innerValue, 
                description: `Solve ${bracketMatch.full} = ${innerValue} (${bracketMatch.bracketName})`,
                bracketType: bracketMatch.bracketType
            };
        }
        return null;
    }
    
    // Handle multiplication/division (operator like × or ÷)
    if (operationInfo.type === '×' || operationInfo.type === '÷') {
        return this.solveOperator(expression, operationInfo.type);
    }
    
    // Handle addition/subtraction
    if (operationInfo.type === '+' || operationInfo.type === '-') {
        return this.solveOperator(expression, operationInfo.type);
    }
    
    return null;
}

// Helper function to solve regular operators
static solveOperator(expression, operator) {
    // Find operator position
    let opIndex = -1;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === operator) {
            opIndex = i;
            break;
        }
    }
    
    if (opIndex === -1) return null;
    
    // Find numbers around operator
    let leftPart = expression.substring(0, opIndex).trim();
    let rightPart = expression.substring(opIndex + 1).trim();
    
    // Extract numbers
    let leftMatch = leftPart.match(/(\d+)(?!.*\d)/);
    let rightMatch = rightPart.match(/^(\d+)/);
    
    if (leftMatch && rightMatch) {
        let num1 = parseInt(leftMatch[0]);
        let num2 = parseInt(rightMatch[0]);
        
        let result;
        switch(operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '×': result = num1 * num2; break;
            case '÷': result = num1 / num2; break;
            default: return null;
        }
        
        let newExpr = leftPart.substring(0, leftPart.length - leftMatch[0].length) + result + rightPart.substring(rightMatch[0].length);
        return { 
            newExpression: newExpr, 
            result: result, 
            description: `${num1} ${operator} ${num2} = ${result}` 
        };
    }
    
    return null;
}
    
    static findInnermostBracket(expression) {
    let bracketPairs = {
        '(': { close: ')', type: 'round', name: 'Round Brackets' },
        '[': { close: ']', type: 'square', name: 'Square Brackets' },
        '{': { close: '}', type: 'curly', name: 'Curly Braces' }
    };
    
    let stack = [];
    let innermost = null;
    let innermostDepth = -1;
    
    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];
        
        // Opening bracket
        if (bracketPairs[char]) {
            stack.push({
                char: char,
                type: bracketPairs[char].type,
                name: bracketPairs[char].name,
                position: i,
                depth: stack.length
            });
        }
        // Closing bracket
        else if (char === ')' || char === ']' || char === '}') {
            if (stack.length > 0) {
                let lastOpen = stack.pop();
                // Found a complete bracket pair
                let inner = expression.substring(lastOpen.position + 1, i);
                let depth = lastOpen.depth;
                
                // Check if this is the innermost (deepest)
                if (depth > innermostDepth) {
                    innermostDepth = depth;
                    innermost = {
                        openChar: lastOpen.char,
                        closeChar: char,
                        bracketType: lastOpen.type,
                        bracketName: lastOpen.name,
                        start: lastOpen.position,
                        end: i,
                        full: expression.substring(lastOpen.position, i + 1),
                        inner: inner,
                        depth: depth
                    };
                }
            }
        }
    }
    
    return innermost;
}
    
    static evaluateExpression(expr) {
        // Simple evaluation for inner bracket expressions
        let parts = expr.match(/\d+|[+\-×÷]/g);
        if (!parts) return parseInt(expr);
        
        let result = parseInt(parts[0]);
        for (let i = 1; i < parts.length; i += 2) {
            let op = parts[i];
            let num = parseInt(parts[i + 1]);
            switch(op) {
                case '+': result += num; break;
                case '-': result -= num; break;
                case '×': result *= num; break;
                case '÷': result /= num; break;
            }
        }
        return result;
    }
}

// ========== GAME INITIALIZATION ==========
function initGame() {
    // Load saved data
    gameState.playerName = localStorage.getItem('playerName') || 'Player';
    gameState.playerAvatar = localStorage.getItem('playerCharacter') === 'rohan' ? '👦' : 
                              (localStorage.getItem('playerCharacter') === 'sia' ? '👧' : '🤖');
    gameState.score = parseInt(localStorage.getItem('playerScore')) || 0;
    gameState.currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
    gameState.currentExpressionIndex = parseInt(localStorage.getItem('currentStep')) || 0;
    gameState.streak = parseInt(localStorage.getItem('streak')) || 0;
    
    // Update UI
    document.getElementById('playerNameDisplay').textContent = gameState.playerName;
    document.getElementById('playerAvatar').textContent = gameState.playerAvatar;
    document.getElementById('scoreDisplay').textContent = gameState.score;
    document.getElementById('streakDisplay').textContent = gameState.streak;
    
    // Load expressions for current level
    loadExpressionsForLevel();
    
    // Load current expression
    loadCurrentExpression();
    
    // Update journey progress
    updateJourneyProgress();
    
    // Update bus position
    updateBusPosition();
    
    // Update level display
    updateLevelDisplay();
}

function loadExpressionsForLevel() {
    gameState.expressions = [...expressionsDB[gameState.currentLevel]];
}

function loadCurrentExpression() {
    if (gameState.currentExpressionIndex >= gameState.expressions.length) {
        // Level complete
        levelComplete();
        return;
    }
    
    gameState.currentExpression = gameState.expressions[gameState.currentExpressionIndex];
    gameState.currentStep = 0;
    
    // Display expression
    document.getElementById('expressionDisplay').textContent = gameState.currentExpression.text;
    document.getElementById('stepHint').textContent = 'Which operation to solve FIRST?';
    document.getElementById('progressText').textContent = `Expression ${gameState.currentExpressionIndex + 1}/${gameState.expressions.length}`;
    
    // Clear steps panel
    document.getElementById('stepsList').innerHTML = '';
    
    // Add initial step
    addStepToPanel(`Original: ${gameState.currentExpression.text}`, 'start');
}

function addStepToPanel(stepText, type) {
    const stepsList = document.getElementById('stepsList');
    const stepDiv = document.createElement('div');
    stepDiv.className = `step-item ${type === 'correct' ? 'step-correct' : ''}`;
    stepDiv.innerHTML = `✓ ${stepText}`;
    stepsList.appendChild(stepDiv);
    stepsList.scrollTop = stepsList.scrollHeight;
}

// ========== GAME MECHANICS ==========
function checkAnswer(selectedOperator) {
    if (!gameState.currentExpression) return;
    
    const currentExpr = document.getElementById('expressionDisplay').textContent;
    const correctOp = BODMASEngine.getNextOperation(currentExpr);
    
    if (!correctOp) return;
    
    let isCorrect = false;
    
    // ========== CHECK DIFFERENT BRACKET TYPES ==========
    if (correctOp.type === 'round_bracket') {
        // User must select round bracket option
        isCorrect = (selectedOperator === 'round_bracket' || selectedOperator === '()' || selectedOperator === '( )');
    }
    else if (correctOp.type === 'square_bracket') {
        // User must select square bracket option
        isCorrect = (selectedOperator === 'square_bracket' || selectedOperator === '[]' || selectedOperator === '[ ]');
    }
    else if (correctOp.type === 'curly_bracket') {
        // User must select curly bracket option
        isCorrect = (selectedOperator === 'curly_bracket' || selectedOperator === '{}' || selectedOperator === '{ }');
    }
    else if (correctOp.type === '×' || correctOp.type === '÷') {
        // Multiplication or Division
        isCorrect = (selectedOperator === correctOp.type);
    }
    else if (correctOp.type === '+' || correctOp.type === '-') {
        // Addition or Subtraction
        isCorrect = (selectedOperator === correctOp.type);
    }
    
    if (isCorrect) {
        handleCorrectAnswer(currentExpr, correctOp);
    } else {
        handleWrongAnswer(selectedOperator, correctOp);
    }
}

function handleCorrectAnswer(expression, operator) {
    // Add points
    let pointsEarned = 10;
    if (gameState.streak >= 3) pointsEarned += 5;
    if (gameState.streak >= 5) pointsEarned += 10;
    
    gameState.score += pointsEarned;
    gameState.streak++;
    gameState.mistakes = 0;
    
    // Update UI
    document.getElementById('scoreDisplay').textContent = gameState.score;
    document.getElementById('streakDisplay').textContent = gameState.streak;
    
    // Show feedback
    showFeedback('✅ Correct! +' + pointsEarned + ' points', 'correct');
    
    // Solve the step
    const result = BODMASEngine.solveStep(expression, operator);
    
    if (result) {
        // Update expression
        document.getElementById('expressionDisplay').textContent = result.newExpression;
        addStepToPanel(result.description, 'correct');
        
        // Check if expression is complete (only one number left)
        if (/^\d+$/.test(result.newExpression.trim())) {
            expressionComplete();
        } else {
            // Update hint
            const nextOp = BODMASEngine.getNextOperation(result.newExpression);
            if (nextOp) {
                document.getElementById('stepHint').textContent = `Next: Solve ${nextOp === 'bracket' ? 'BRACKETS' : nextOp} first!`;
            }
        }
        
        // Animate bus
        animateBus();
        
        // Save progress
        saveProgress();
    }
}

function handleWrongAnswer(selected, correct) {
    gameState.mistakes++;
    gameState.streak = 0;
    
    document.getElementById('streakDisplay').textContent = '0';
    document.getElementById('mistakesDisplay').textContent = gameState.mistakes;
    
    let message = `❌ Wrong! `;
    
    // ========== MESSAGES FOR DIFFERENT BRACKET TYPES ==========
    if (correct.type === 'round_bracket') {
        message += `Solve ROUND BRACKETS ( ) first!`;
    }
    else if (correct.type === 'square_bracket') {
        message += `Solve SQUARE BRACKETS [ ] first!`;
    }
    else if (correct.type === 'curly_bracket') {
        message += `Solve CURLY BRACES { } first!`;
    }
    else if (correct.type === '×' || correct.type === '÷') {
        message += `"${selected}" comes later. Multiplication and Division come before Addition/Subtraction! Solve ${correct.type} first from LEFT to RIGHT!`;
    }
    else if (correct.type === '+' || correct.type === '-') {
        message += `"${selected}" comes later. After solving brackets and MD, solve ${correct.type} from LEFT to RIGHT!`;
    }
    else {
        message += `Check BODMAS order: Brackets → DM → AS!`;
    }
    
    showFeedback(message, 'wrong');
    
    // Animate shake
    const exprCard = document.querySelector('.expression-card');
    exprCard.classList.add('shake');
    setTimeout(() => exprCard.classList.remove('shake'), 300);
    
    // Show hint after 2 mistakes
    if (gameState.mistakes >= 2) {
        showHint();
    }
    
    saveProgress();
}

function expressionComplete() {
    // Add bonus for perfect expression
    if (gameState.mistakes === 0) {
        gameState.score += 25;
        showFeedback('🎉 Perfect! +25 bonus!', 'correct');
        document.getElementById('scoreDisplay').textContent = gameState.score;
    }
    
    // Move to next expression
    gameState.currentExpressionIndex++;
    
    // Save progress
    localStorage.setItem('currentStep', gameState.currentExpressionIndex);
    localStorage.setItem('playerScore', gameState.score);
    
    // Check if level complete
    if (gameState.currentExpressionIndex >= gameState.expressions.length) {
        levelComplete();
    } else {
        loadCurrentExpression();
    }
}

function levelComplete() {
    // Level completion bonus
    let bonus = 100;
    gameState.score += bonus;
    document.getElementById('scoreDisplay').textContent = gameState.score;
    
    showFeedback(`🎉 Level ${gameState.currentLevel} Complete! +${bonus} bonus!`, 'correct');
    
    // Check if game complete
    if (gameState.currentLevel >= 5) {
        gameComplete();
        return;
    }
    
    // Move to next level
    gameState.currentLevel++;
    gameState.currentExpressionIndex = 0;
    gameState.streak = 0;
    gameState.mistakes = 0;
    
    // Save
    localStorage.setItem('currentLevel', gameState.currentLevel);
    localStorage.setItem('currentStep', '0');
    localStorage.setItem('streak', '0');
    
    // Load new expressions
    loadExpressionsForLevel();
    loadCurrentExpression();
    
    // Update displays
    updateLevelDisplay();
    updateJourneyProgress();
    updateBusPosition();
}

function gameComplete() {
    gameState.completed = true;
    
    // Save final score
    localStorage.setItem('playerScore', gameState.score);
    
    // Show completion modal
    const modal = document.getElementById('completionModal');
    document.getElementById('certificateName').textContent = gameState.playerName;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('completionMessage').textContent = `You mastered BODMAS! Score: ${gameState.score}`;
    
    modal.style.display = 'flex';
    
    // Celebration animation
    const gameArea = document.querySelector('.game-area');
    gameArea.classList.add('celebrate');
    setTimeout(() => gameArea.classList.remove('celebrate'), 1000);
}

// ========== HINT SYSTEM ==========
function showHint() {
    gameState.hintsUsed++;
    
    const currentExpr = document.getElementById('expressionDisplay').textContent;
    const nextOp = BODMASEngine.getNextOperation(currentExpr);
    
    let hintText = '';
    
    // ========== HINTS FOR DIFFERENT BRACKET TYPES ==========
    if (nextOp && nextOp.type === 'round_bracket') {
        let bracketInfo = nextOp.bracketInfo;
        hintText = `💡 BODMAS Rule: ROUND BRACKETS ( ) come first!\n\n`;
        if (bracketInfo) {
            hintText += `🔍 Found: ${bracketInfo.full}\n`;
            hintText += `📦 Inside: ${bracketInfo.inner}\n`;
            hintText += `✅ Solve what's inside the brackets FIRST: ${bracketInfo.inner} = ?`;
        } else {
            hintText += `✅ Look for ( ) brackets and solve what's inside them first!`;
        }
    }
    else if (nextOp && nextOp.type === 'square_bracket') {
        let bracketInfo = nextOp.bracketInfo;
        hintText = `💡 BODMAS Rule: SQUARE BRACKETS [ ] come first!\n\n`;
        if (bracketInfo) {
            hintText += `🔍 Found: ${bracketInfo.full}\n`;
            hintText += `📦 Inside: ${bracketInfo.inner}\n`;
            hintText += `✅ Solve what's inside the brackets FIRST: ${bracketInfo.inner} = ?`;
        } else {
            hintText += `✅ Look for [ ] brackets and solve what's inside them first!`;
        }
    }
    else if (nextOp && nextOp.type === 'curly_bracket') {
        let bracketInfo = nextOp.bracketInfo;
        hintText = `💡 BODMAS Rule: CURLY BRACES { } come first!\n\n`;
        if (bracketInfo) {
            hintText += `🔍 Found: ${bracketInfo.full}\n`;
            hintText += `📦 Inside: ${bracketInfo.inner}\n`;
            hintText += `✅ Solve what's inside the braces FIRST: ${bracketInfo.inner} = ?`;
        } else {
            hintText += `✅ Look for { } braces and solve what's inside them first!`;
        }
    }
    else if (nextOp && (nextOp.type === '×' || nextOp.type === '÷')) {
        hintText = `💡 BODMAS Rule: Multiplication (×) and Division (÷) come before Addition (+) and Subtraction (-)!\n\n`;
        hintText += `🔍 Found: ${nextOp.type}\n`;
        hintText += `✅ Solve ${nextOp.type} first from LEFT to RIGHT!`;
    }
    else if (nextOp && (nextOp.type === '+' || nextOp.type === '-')) {
        hintText = `💡 BODMAS Rule: After solving brackets and MD, solve Addition (+) and Subtraction (-)!\n\n`;
        hintText += `🔍 Found: ${nextOp.type}\n`;
        hintText += `✅ Solve ${nextOp.type} from LEFT to RIGHT!`;
    }
    else {
        hintText = `💡 BODMAS Rule:\n\n`;
        hintText += `1️⃣ BRACKETS ( ) [ ] { } - Solve innermost first\n`;
        hintText += `2️⃣ DIVISION ÷ and MULTIPLICATION × - Left to right\n`;
        hintText += `3️⃣ ADDITION + and SUBTRACTION - - Left to right\n\n`;
        hintText += `🎯 Look at your expression and find what to solve next!`;
    }
    
    showFeedback(hintText, 'hint');
    
    // Save hint usage
    localStorage.setItem('hintsUsed', (parseInt(localStorage.getItem('hintsUsed')) || 0) + 1);
}

// ========== UI UPDATE FUNCTIONS ==========
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    
    setTimeout(() => {
        feedback.className = 'feedback';
        feedback.textContent = '';
    }, 3000);
}

function updateLevelDisplay() {
    const levelInfo = levelConfig[gameState.currentLevel];
    document.getElementById('levelBadge').textContent = `Level ${gameState.currentLevel}: ${levelInfo.name}`;
    document.getElementById('levelBadge').style.background = `hsl(${30 + gameState.currentLevel * 15}, 100%, 60%)`;
}

function updateJourneyProgress() {
    const milestones = ['home', 'busstop', 'school', 'park', 'picnic'];
    const currentMilestone = levelConfig[gameState.currentLevel].milestone;
    
    milestones.forEach((milestone, index) => {
        const element = document.querySelector(`.milestone[data-milestone="${milestone}"]`);
        if (element) {
            element.classList.remove('completed', 'active');
            
            // Check if milestone is completed
            if (index < milestones.indexOf(currentMilestone)) {
                element.classList.add('completed');
            } else if (milestone === currentMilestone) {
                element.classList.add('active');
            }
        }
    });
}

function updateBusPosition() {
    const milestones = ['home', 'busstop', 'school', 'park', 'picnic'];
    const currentMilestone = levelConfig[gameState.currentLevel].milestone;
    const milestoneIndex = milestones.indexOf(currentMilestone);
    
    // Calculate position percentage
    const totalMilestones = milestones.length - 1;
    const progressPercent = (milestoneIndex / totalMilestones) * 90;
    
    const busIcon = document.getElementById('busIcon');
    const journeyPath = document.querySelector('.journey-path');
    const pathRect = journeyPath.getBoundingClientRect();
    const containerRect = document.querySelector('.game-container').getBoundingClientRect();
    
    // Position bus (simplified - using percentage)
    busIcon.style.left = `calc(5% + ${progressPercent}% - 10px)`;
}

function animateBus() {
    const busIcon = document.getElementById('busIcon');
    busIcon.style.transform = 'translateX(10px)';
    setTimeout(() => busIcon.style.transform = 'translateX(0)', 200);
}

function saveProgress() {
    localStorage.setItem('playerScore', gameState.score);
    localStorage.setItem('streak', gameState.streak);
    localStorage.setItem('currentLevel', gameState.currentLevel);
    localStorage.setItem('currentStep', gameState.currentExpressionIndex);
}

// ========== RESET GAME ==========
function resetGame() {
    if (confirm('Are you sure you want to reset all progress?')) {
        localStorage.clear();
        window.location.reload();
    }
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    // Operator buttons
    document.querySelectorAll('.operator-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!gameState.completed) {
                const operator = btn.getAttribute('data-operator');
                checkAnswer(operator);
            }
        });
    });
    
    // Hint button
    document.getElementById('hintBtn').addEventListener('click', () => {
        if (!gameState.completed) {
            showHint();
        }
    });
    
    // Reset button
    document.getElementById('resetGameBtn').addEventListener('click', resetGame);
    
    // Play again button
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });
    
    // Share button
    document.getElementById('shareBtn').addEventListener('click', () => {
        const text = `I scored ${gameState.score} points in BODMAS Bus Express! Can you beat my score? 🚌`;
        if (navigator.share) {
            navigator.share({ title: 'BODMAS Bus Express', text: text });
        } else {
            alert('Copy this: ' + text);
        }
    });
    
    // Close modal when clicking outside
    document.getElementById('completionModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('completionModal')) {
            document.getElementById('completionModal').style.display = 'none';
        }
    });
});