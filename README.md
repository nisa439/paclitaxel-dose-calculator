# Paclitaxel Dose Calculator

Professional web-based tool for optimal paclitaxel dose calculation in lung cancer research and clinical decision support.

## 🎯 Overview

This calculator uses machine learning to predict optimal paclitaxel doses based on extensive experimental data from 390 lung cancer cell lines. The tool provides IC50 values, optimal doses for different efficacy levels, and confidence intervals to support clinical and research decisions.

## 🔬 Features

- **390 Cell Lines Database**: Comprehensive dataset with validated lung cancer cell lines
- **Optimal Dose Calculation**: Calculates optimal doses for efficacy levels from 50% to 90%
- **IC50 Determination**: Provides IC50 values for drug sensitivity assessment
- **Interactive Visualization**: Dose-response curves with Chart.js
- **Export Functionality**: Download results as CSV files
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Professional UI**: Clean, medical-grade interface design

## 📊 Model Information

- **Algorithm**: Random Forest Regression
- **R² Score**: 0.4563
- **Training Samples**: 3,291
- **Test Samples**: 823
- **Total Dataset**: 4,114 dose-response measurements
- **Cross-Validation**: 5-fold CV (Mean: 0.4294, Std: 0.0375)

### Feature Importance
- **Log Dose**: 63.28%
- **Cell Line**: 36.72%

## 🚀 Live Demo

Visit the live calculator: [https://nisa439.github.io/paclitaxel-dose-calculator](https://nisa439.github.io/paclitaxel-dose-calculator)

## 🛠️ Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for CDN resources

### Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/nisa439/paclitaxel-dose-calculator.git
   cd paclitaxel-dose-calculator
   ```

2. Open `index.html` in your web browser or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
paclitaxel-dose-calculator/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   └── app.js          # Main application logic
│   └── data/
│       └── paclitaxel_web_data.json  # Model data (to be added)
├── images/                 # Screenshots and assets
└── README.md              # This file
```

## 🔧 Usage

1. **Select Cell Line**: Choose from 390 available lung cancer cell lines
2. **Set Target Efficacy**: Use the slider to select desired efficacy (50-90%)
3. **Calculate**: Click "Calculate Optimal Dose" to get results
4. **View Results**: See optimal dose, IC50, and confidence intervals
5. **Visualize**: Interactive dose-response curve automatically generated
6. **Export**: Download results as CSV for further analysis

## 📈 Sample Results

| Cell Line | IC50 (µM) | Optimal Dose 80% (µM) | Sensitivity |
|-----------|-----------|----------------------|-------------|
| ACH-000399 | 0.009069 | 0.002974 | High |
| ACH-002145 | 0.036613 | 0.012003 | High |
| ACH-000081 | 0.075646 | 0.024798 | Medium |

## 🔬 Scientific Background

### Methodology
- **Data Processing**: Log transformation of dose values, cell line encoding
- **Model Training**: Random Forest with hyperparameter optimization
- **Validation**: 5-fold cross-validation with bootstrap confidence intervals
- **Performance**: R² = 0.46 indicates moderate-to-good predictive power

### Clinical Relevance
- **Personalized Medicine**: Cell line-specific dose recommendations
- **Safety**: Optimal dosing reduces toxicity while maintaining efficacy
- **Research Support**: Standardized tool for preclinical studies

## ⚠️ Disclaimer

**Important**: This tool is designed for research and educational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Dataset from lung cancer cell line experiments
- Machine learning model developed using scikit-learn
- UI components from Bootstrap 5
- Charts powered by Chart.js

## 📞 Contact

For questions, suggestions, or collaborations:
- GitHub: [@nisa439](https://github.com/nisa439)
- Project Issues: [GitHub Issues](https://github.com/nisa439/paclitaxel-dose-calculator/issues)

## 🔄 Version History

- **v1.0.0** (2025-01-18): Initial release with basic functionality
  - 390 cell lines database
  - Optimal dose calculation
  - Interactive visualization
  - Export functionality

---

**Made with ❤️ for advancing lung cancer research**