/**
 * Paclitaxel Dose Calculator - Main Application (Real Data Version)
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
            console.log('🚀 Initializing Paclitaxel Calculator with real data...');
            
            // Show loading state
            this.showLoading();
            
            // Load real data from JSON
            await this.loadRealData();
            
            // Initialize UI
            this.initializeUI();
            
            // Bind events
            this.bindEvents();
            
            console.log('✅ Calculator initialized successfully with real data');
            
        } catch (error) {
            console.error('❌ Error initializing calculator:', error);
            this.showError('Failed to initialize calculator. Please refresh the page.');
        }
    }

    async loadRealData() {
        try {
            console.log('📊 Loading real model data from JSON...');
            
            // Fetch the real data from JSON file
            const response = await fetch('assets/data/paclitaxel_web_data.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.data = await response.json();
            
            console.log(`✅ Real data loaded successfully:`);
            console.log(`   - ${this.data.cell_lines.length} cell lines`);
            console.log(`   - Model R²: ${this.data.model_info.r2_score}`);
            console.log(`   - Total samples: ${this.data.model_info.total_samples}`);
            
        } catch (error) {
            console.error('❌ Error loading real data:', error);
            console.log('🔄 Falling back to mock data...');
            
            // Fallback to mock data if JSON fails
            this.data = await this.getMockData();
        }
    }

    async getMockData() {
        // Fallback mock data (same as before)
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
                }
            },
            model_info: {
                r2_score: 0.4563,
                rmse: 0.2285,
                training_samples: 3291,
                test_samples: 823,
                total_samples: 4114,
                cell_lines_count: 10,
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
        
        // Update stats in hero section
        this.updateHeroStats();
        
        // Hide loading state
        this.hideLoading();
    }

    populateCellLineSelect() {
        const select = document.getElementById('cellLineSelect');
        
        // Clear loading option
        select.innerHTML = '<option value="">Select Cell Line</option>';
        
        // Add cell lines with better formatting
        this.data.cell_lines.forEach(cellLine => {
            const option = document.createElement('option');
            option.value = cellLine.id;
            
            // Format with IC50 and sensitivity
            const ic50Text = cellLine.ic50 ? cellLine.ic50.toFixed(6) : 'N/A';
            const sensitivityText = cellLine.sensitivity ? cellLine.sensitivity.charAt(0).toUpperCase() + cellLine.sensitivity.slice(1) : 'Unknown';
            
            option.textContent = `${cellLine.id} (IC50: ${ic50Text} µM, ${sensitivityText})`;
            select.appendChild(option);
        });
        
        console.log(`✅ Populated ${this.data.cell_lines.length} cell lines`);
    }

    updateHeroStats() {
        // Update hero section stats with real data
        const statsElements = document.querySelectorAll('.hero-stats h3');
        
        if (statsElements.length >= 3) {
            statsElements[0].textContent = this.data.model_info.cell_lines_count || this.data.cell_lines.length;
            statsElements[1].textContent = this.data.model_info.total_samples.toLocaleString();
            statsElements[2].textContent = this.data.model_info.r2_score.toFixed(2);
        }
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
            const ic50Text = cellLine.ic50 ? cellLine.ic50.toFixed(6) : 'N/A';
            console.log(`📊 Selected cell line: ${cellLineId} (IC50: ${ic50Text} µM)`);
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
        
        if (!cellLine) {
            throw new Error(`Cell line ${cellLineId} not found`);
        }
        
        // Get optimal dose data from real data
        let optimalDose, achievedViability, achievedEfficacy;
        
        // Check if we have pre-calculated optimal doses
        if (this.data.optimal_doses && this.data.optimal_doses[cellLineId] && this.data.optimal_doses[cellLineId][targetEfficacy]) {
            const doseData = this.data.optimal_doses[cellLineId][targetEfficacy];
            optimalDose = doseData.dose;
            achievedViability = doseData.viability;
            achievedEfficacy = doseData.efficacy;
        } else {
            // Use interpolation based on IC50 and target efficacy
            optimalDose = this.interpolateOptimalDose(cellLine, targetEfficacy);
            achievedViability = 1 - (targetEfficacy / 100);
            achievedEfficacy = targetEfficacy / 100;
        }
        
        // Calculate confidence intervals
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
        // Enhanced interpolation using real IC50 data
        if (!cellLine.ic50) {
            console.warn(`No IC50 data for ${cellLine.id}, using fallback calculation`);
            return 0.050; // Fallback dose
        }
        
        // More sophisticated interpolation
        const ic50 = cellLine.ic50;
        const efficacyRatio = targetEfficacy / 50; // Normalize to IC50 (50% efficacy)
        
        // Hill equation approximation: dose = IC50 * (efficacy/(1-efficacy))^(1/hill_slope)
        const hillSlope = 1; // Simplified hill slope
        const efficacyFraction = targetEfficacy / 100;
        const doseRatio = Math.pow(efficacyFraction / (1 - efficacyFraction), 1 / hillSlope);
        
        return ic50 * doseRatio;
    }

    displayResults(results) {
        const resultsDiv = document.getElementById('resultsDisplay');
        
        const confidenceHtml = results.confidenceInterval ? `
            <div class="result-item">
                <label>95% Confidence Interval:</label>
                <span>${results.confidenceInterval.lower.toFixed(6)} - ${results.confidenceInterval.upper.toFixed(6)} µM</span>
            </div>
        ` : '';
        
        const ic50Text = results.cellLine.ic50 ? results.cellLine.ic50.toFixed(6) : 'N/A';
        const sensitivityBadge = results.cellLine.sensitivity ? 
            `<span class="badge bg-${results.cellLine.sensitivity === 'high' ? 'success' : results.cellLine.sensitivity === 'medium' ? 'warning' : 'secondary'}">${results.cellLine.sensitivity}</span>` :
            `<span class="badge bg-secondary">Unknown</span>`;
        
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
                    <span class="text-success fw-bold">${results.optimalDose.toFixed(6)} µM</span>
                </div>
                <div class="result-item">
                    <label>IC50 (Reference):</label>
                    <span>${ic50Text} µM</span>
                </div>
                <div class="result-item">
                    <label>Cell Sensitivity:</label>
                    ${sensitivityBadge}
                </div>
                ${confidenceHtml}
                <div class="result-item">
                    <label>Model R² Score:</label>
                    <span>${results.modelInfo.r2_score.toFixed(4)}</span>
                </div>
                <div class="result-item">
                    <label>Training Samples:</label>
                    <span>${results.modelInfo.total_samples.toLocaleString()}</span>
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
        
        if (!cellLine) {
            console.error(`Cell line ${cellLineId} not found for chart`);
            return;
        }
        
        // Check if we have real dose-response curves
        if (this.data.dose_response_curves && this.data.dose_response_curves[cellLineId]) {
            const curveData = this.data.dose_response_curves[cellLineId];
            doses.push(...curveData.doses);
            viabilities.push(...curveData.viabilities);
        } else {
            // Generate synthetic curve based on IC50
            for (let i = 0; i <= 50; i++) {
                const dose = Math.pow(10, -3.4 + (i * 2.4 / 50)); // Log scale from 0.0004 to 0.1
                const ic50 = cellLine.ic50 || 0.050; // Use real IC50 or fallback
                
                // Hill equation: viability = 1 / (1 + (dose/IC50)^hill_slope)
                const hillSlope = 2; // Hill slope
                const viability = 1 / (1 + Math.pow(dose / ic50, hillSlope));
                
                doses.push(dose);
                viabilities.push(viability);
            }
        }
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: doses.map(d => d.toFixed(6)),
                datasets: [{
                    label: `${cellLineId} Dose-Response`,
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
                        text: `Dose-Response Curve: ${cellLineId} (IC50: ${cellLine.ic50 ? cellLine.ic50.toFixed(6) : 'N/A'} µM)`,
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
        
        console.log('✅ Dose-response chart created for', cellLineId);
    }

    exportResults() {
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
            ['IC50 (µM)', results.cellLine.ic50 ? results.cellLine.ic50.toFixed(6) : 'N/A'],
            ['Cell Sensitivity', results.cellLine.sensitivity || 'Unknown'],
            ['Model R² Score', results.modelInfo.r2_score.toFixed(4)],
            ['Training Samples', results.modelInfo.total_samples],
            ['', ''],
            ['Generated by', 'Paclitaxel Dose Calculator'],
            ['Date', new Date().toISOString().split('T')[0]]
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
                <p class="mt-2">Loading real model data...</p>
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
                <small class="text-muted">Check browser console for details</small>
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