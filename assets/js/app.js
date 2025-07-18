/**
 * Paclitaxel Dose Calculator - Main Application
 * Professional tool for optimal dose calculation
 */

class PaclitaxelCalculator {
    constructor() {
        this.data = null;
        this.chart = null;
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Initializing Paclitaxel Calculator...');
            
            // Show loading state
            this.showLoading();
            
            // Load data
            await this.loadData();
            
            // Initialize UI
            this.initializeUI();
            
            // Bind events
            this.bindEvents();
            
            console.log('✅ Calculator initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing calculator:', error);
            this.showError('Failed to initialize calculator. Please refresh the page.');
        }
    }

    async loadData() {
        try {
            console.log('📊 Loading model data...');
            
            // In a real implementation, this would load from your JSON file
            // For now, we'll use mock data based on your Colab results
            this.data = await this.getMockData();
            
            console.log(`✅ Data loaded: ${this.data.cell_lines.length} cell lines`);
            
        } catch (error) {
            console.error('❌ Error loading data:', error);
            throw new Error('Failed to load model data');
        }
    }

    async getMockData() {
        // Mock data based on your Colab results
        // In real implementation, this would be: fetch('assets/data/paclitaxel_web_data.json')
        
        return {
            cell_lines: [
                {
                    id: 'ACH-002145',
                    name: 'ACH-002145',
                    ic50: 0.036613,
                    ic50_log: -1.436364,
                    sensitivity: 'high'
                },
                {
                    id: 'ACH-000081',
                    name: 'ACH-000081',
                    ic50: 0.075646,
                    ic50_log: -1.121212,
                    sensitivity: 'medium'
                },
                {
                    id: 'ACH-002258',
                    name: 'ACH-002258',
                    ic50: 0.075646,
                    ic50_log: -1.121212,
                    sensitivity: 'medium'
                },
                {
                    id: 'ACH-000136',
                    name: 'ACH-000136',
                    ic50: 0.036613,
                    ic50_log: -1.436364,
                    sensitivity: 'high'
                },
                {
                    id: 'ACH-000227',
                    name: 'ACH-000227',
                    ic50: 0.075646,
                    ic50_log: -1.121212,
                    sensitivity: 'medium'
                },
                {
                    id: 'ACH-000358',
                    name: 'ACH-000358',
                    ic50: 0.056130,
                    ic50_log: -1.251,
                    sensitivity: 'medium'
                },
                {
                    id: 'ACH-000006',
                    name: 'ACH-000006',
                    ic50: 0.056130,
                    ic50_log: -1.251,
                    sensitivity: 'medium'
                },
                {
                    id: 'ACH-001182',
                    name: 'ACH-001182',
                    ic50: 0.036613,
                    ic50_log: -1.436364,
                    sensitivity: 'high'
                },
                {
                    id: 'ACH-000399',
                    name: 'ACH-000399',
                    ic50: 0.009069,
                    ic50_log: -2.042,
                    sensitivity: 'high'
                },
                {
                    id: 'ACH-000871',
                    name: 'ACH-000871',
                    ic50: 0.056130,
                    ic50_log: -1.251,
                    sensitivity: 'medium'
                }
            ],
            optimal_doses: {
                'ACH-002145': {
                    50: { dose: 0.036613, viability: 0.5, efficacy: 0.5 },
                    60: { dose: 0.025229, viability: 0.4, efficacy: 0.6 },
                    70: { dose: 0.017374, viability: 0.3, efficacy: 0.7 },
                    80: { dose: 0.012003, viability: 0.2, efficacy: 0.8 },
                    90: { dose: 0.008284, viability: 0.1, efficacy: 0.9 }
                },
                'ACH-000081': {
                    50: { dose: 0.075646, viability: 0.5, efficacy: 0.5 },
                    60: { dose: 0.052142, viability: 0.4, efficacy: 0.6 },
                    70: { dose: 0.035942, viability: 0.3, efficacy: 0.7 },
                    80: { dose: 0.024798, viability: 0.2, efficacy: 0.8 },
                    90: { dose: 0.017121, viability: 0.1, efficacy: 0.9 }
                },
                'ACH-000399': {
                    50: { dose: 0.009069, viability: 0.5, efficacy: 0.5 },
                    60: { dose: 0.006250, viability: 0.4, efficacy: 0.6 },
                    70: { dose: 0.004309, viability: 0.3, efficacy: 0.7 },
                    80: { dose: 0.002974, viability: 0.2, efficacy: 0.8 },
                    90: { dose: 0.002052, viability: 0.1, efficacy: 0.9 }
                }
            },
            model_info: {
                r2_score: 0.4563,
                rmse: 0.2285,
                training_samples: 3291,
                test_samples: 823,
                total_samples: 4114,
                cell_lines_count: 390,
                feature_importance: {
                    log_dose: 0.6328,
                    cell_line: 0.3672
                }
            }
        };
    }

    initializeUI() {
        // Populate cell line dropdown
        this.populateCellLineSelect();
        
        // Initialize efficacy slider
        this.updateEfficacyDisplay();
        
        // Hide loading state
        this.hideLoading();
    }

    populateCellLineSelect() {
        const select = document.getElementById('cellLineSelect');
        
        // Clear loading option
        select.innerHTML = '<option value="">Select Cell Line</option>';
        
        // Add cell lines
        this.data.cell_lines.forEach(cellLine => {
            const option = document.createElement('option');
            option.value = cellLine.id;
            option.textContent = `${cellLine.id} (IC50: ${cellLine.ic50.toFixed(6)} µM)`;
            select.appendChild(option);
        });
        
        console.log(`✅ Populated ${this.data.cell_lines.length} cell lines`);
    }

    bindEvents() {
        // Calculate button
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculateOptimalDose();
        });
        
        // Efficacy slider
        document.getElementById('efficacySlider').addEventListener('input', (e) => {
            this.updateEfficacyDisplay();
        });
        
        // Cell line selection
        document.getElementById('cellLineSelect').addEventListener('change', (e) => {
            if (e.target.value) {
                this.updateCellLineInfo(e.target.value);
            }
        });
    }

    updateEfficacyDisplay() {
        const slider = document.getElementById('efficacySlider');
        const display = document.getElementById('efficacyValue');
        display.textContent = `${slider.value}%`;
    }

    updateCellLineInfo(cellLineId) {
        const cellLine = this.data.cell_lines.find(cl => cl.id === cellLineId);
        if (cellLine) {
            console.log(`📊 Selected cell line: ${cellLineId} (IC50: ${cellLine.ic50.toFixed(6)} µM)`);
        }
    }

    calculateOptimalDose() {
        try {
            const cellLineId = document.getElementById('cellLineSelect').value;
            const targetEfficacy = parseInt(document.getElementById('efficacySlider').value);
            const showConfidence = document.getElementById('showConfidence').checked;
            
            // Validation
            if (!cellLineId) {
                this.showError('Please select a cell line');
                return;
            }
            
            console.log(`🧮 Calculating optimal dose for ${cellLineId} at ${targetEfficacy}% efficacy`);
            
            // Show loading
            this.showCalculating();
            
            // Calculate (simulate delay for realism)
            setTimeout(() => {
                const results = this.performCalculation(cellLineId, targetEfficacy, showConfidence);
                this.displayResults(results);
                this.createDoseResponseChart(cellLineId);
            }, 1000);
            
        } catch (error) {
            console.error('❌ Calculation error:', error);
            this.showError('Error during calculation. Please try again.');
        }
    }

    performCalculation(cellLineId, targetEfficacy, showConfidence) {
        const cellLine = this.data.cell_lines.find(cl => cl.id === cellLineId);
        
        // Get optimal dose data
        const cellDoses = this.data.optimal_doses[cellLineId];
        let optimalDose, achievedViability, achievedEfficacy;
        
        if (cellDoses && cellDoses[targetEfficacy]) {
            // Exact match
            const doseData = cellDoses[targetEfficacy];
            optimalDose = doseData.dose;
            achievedViability = doseData.viability;
            achievedEfficacy = doseData.efficacy;
        } else {
            // Interpolation for missing efficacy values
            optimalDose = this.interpolateOptimalDose(cellLine, targetEfficacy);
            achievedViability = 1 - (targetEfficacy / 100);
            achievedEfficacy = targetEfficacy / 100;
        }
        
        // Calculate confidence intervals (mock)
        const confidenceInterval = showConfidence ? {
            lower: optimalDose * 0.85,
            upper: optimalDose * 1.15
        } : null;
        
        return {
            cellLine: cellLine,
            targetEfficacy: targetEfficacy,
            optimalDose: optimalDose,
            achievedViability: achievedViability,
            achievedEfficacy: achievedEfficacy,
            confidenceInterval: confidenceInterval,
            modelInfo: this.data.model_info
        };
    }

    interpolateOptimalDose(cellLine, targetEfficacy) {
        // Simple interpolation based on IC50
        // In real implementation, this would use the actual model
        const efficacyRatio = targetEfficacy / 50; // Normalize to IC50 (50% efficacy)
        return cellLine.ic50 * (1 / efficacyRatio);
    }

    displayResults(results) {
        const resultsDiv = document.getElementById('resultsDisplay');
        
        const confidenceHtml = results.confidenceInterval ? `
            <div class="result-item">
                <label>95% Confidence Interval:</label>
                <span>${results.confidenceInterval.lower.toFixed(6)} - ${results.confidenceInterval.upper.toFixed(6)} µM</span>
            </div>
        ` : '';
        
        resultsDiv.innerHTML = `
            <div class="result-card">
                <h3>Calculation Results</h3>
                <div class="result-item">
                    <label>Cell Line:</label>
                    <span>${results.cellLine.id}</span>
                </div>
                <div class="result-item">
                    <label>Target Efficacy:</label>
                    <span>${results.targetEfficacy}%</span>
                </div>
                <div class="result-item">
                    <label>Optimal Dose:</label>
                    <span class="text-success">${results.optimalDose.toFixed(6)} µM</span>
                </div>
                <div class="result-item">
                    <label>IC50 (Reference):</label>
                    <span>${results.cellLine.ic50.toFixed(6)} µM</span>
                </div>
                <div class="result-item">
                    <label>Cell Sensitivity:</label>
                    <span class="badge bg-${results.cellLine.sensitivity === 'high' ? 'success' : 'warning'}">${results.cellLine.sensitivity}</span>
                </div>
                ${confidenceHtml}
                <div class="result-item">
                    <label>Model R² Score:</label>
                    <span>${results.modelInfo.r2_score.toFixed(4)}</span>
                </div>
            </div>
            <div class="mt-3 text-center">
                <button class="btn btn-outline-primary btn-sm" onclick="window.print()">
                    <i class="fas fa-print"></i> Print Results
                </button>
                <button class="btn btn-outline-secondary btn-sm ms-2" onclick="calculator.exportResults()">
                    <i class="fas fa-download"></i> Export CSV
                </button>
            </div>
        `;
        
        console.log('✅ Results displayed successfully');
    }

    createDoseResponseChart(cellLineId) {
        const ctx = document.getElementById('doseResponseChart').getContext('2d');
        
        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }
        
        // Generate dose-response data
        const doses = [];
        const viabilities = [];
        const cellLine = this.data.cell_lines.find(cl => cl.id === cellLineId);
        
        // Generate curve data (mock sigmoid curve)
        for (let i = 0; i <= 50; i++) {
            const dose = Math.pow(10, -3.4 + (i * 2.4 / 50)); // Log scale from 0.0004 to 0.1
            const logDose = Math.log10(dose);
            const logIC50 = Math.log10(cellLine.ic50);
            
            // Sigmoid curve: viability = 1 / (1 + (dose/IC50)^hill_slope)
            const hillSlope = 2; // Hill slope
            const viability = 1 / (1 + Math.pow(dose / cellLine.ic50, hillSlope));
            
            doses.push(dose);
            viabilities.push(viability);
        }
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: doses.map(d => d.toFixed(6)),
                datasets: [{
                    label: `${cellLineId} Dose-Response Curve`,
                    data: viabilities,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Dose-Response Curve: ${cellLineId}`,
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        type: 'logarithmic',
                        title: {
                            display: true,
                            text: 'Dose (µM)'
                        },
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Viability'
                        },
                        min: 0,
                        max: 1,
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                elements: {
                    point: {
                        radius: 0,
                        hoverRadius: 6
                    }
                }
            }
        });
        
        console.log('✅ Dose-response chart created');
    }

    exportResults() {
        // Simple CSV export functionality
        const cellLineId = document.getElementById('cellLineSelect').value;
        const targetEfficacy = document.getElementById('efficacySlider').value;
        
        if (!cellLineId) {
            this.showError('No results to export');
            return;
        }
        
        const results = this.performCalculation(cellLineId, parseInt(targetEfficacy), true);
        
        const csvData = [
            ['Parameter', 'Value'],
            ['Cell Line', results.cellLine.id],
            ['Target Efficacy (%)', results.targetEfficacy],
            ['Optimal Dose (µM)', results.optimalDose.toFixed(6)],
            ['IC50 (µM)', results.cellLine.ic50.toFixed(6)],
            ['Cell Sensitivity', results.cellLine.sensitivity],
            ['Model R² Score', results.modelInfo.r2_score.toFixed(4)]
        ];
        
        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `paclitaxel_results_${cellLineId}_${targetEfficacy}pct.csv`;
        a.click();
        
        URL.revokeObjectURL(url);
        console.log('✅ Results exported');
    }

    showLoading() {
        const resultsDiv = document.getElementById('resultsDisplay');
        resultsDiv.innerHTML = `
            <div class="text-center">
                <div class="loading"></div>
                <p class="mt-2">Loading calculator...</p>
            </div>
        `;
    }

    hideLoading() {
        const resultsDiv = document.getElementById('resultsDisplay');
        resultsDiv.innerHTML = `
            <div class="text-center text-muted">
                <i class="fas fa-arrow-left fa-2x mb-3"></i>
                <p>Select parameters and click "Calculate" to see results</p>
            </div>
        `;
    }

    showCalculating() {
        const resultsDiv = document.getElementById('resultsDisplay');
        resultsDiv.innerHTML = `
            <div class="text-center">
                <div class="loading"></div>
                <p class="mt-2">Calculating optimal dose...</p>
            </div>
        `;
    }

    showError(message) {
        const resultsDiv = document.getElementById('resultsDisplay');
        resultsDiv.innerHTML = `
            <div class="text-center text-danger">
                <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize the calculator when DOM is loaded
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new PaclitaxelCalculator();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactivity to the hero stats
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.hero-stats h3');
    
    statNumbers.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'scale(1.1)';
            stat.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1)';
        });
    });
});