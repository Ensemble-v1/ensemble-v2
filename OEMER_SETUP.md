# OEMER Installation and Troubleshooting Guide

This comprehensive guide covers OEMER installation, configuration, and troubleshooting for the Ensemble application.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [Common Issues](#common-issues)
- [Advanced Configuration](#advanced-configuration)
- [FAQ](#faq)

## 🚀 Overview

OEMER (Optical Music Recognition) is the core AI engine that converts sheet music images into digital MusicXML format. This guide ensures proper setup and troubleshooting for optimal performance.

### Key Features

- **AI-Powered Recognition**: Advanced deep learning for accurate sheet music recognition
- **Multiple Formats**: Supports various image formats (PNG, JPEG, TIFF, BMP)
- **Preprocessing**: Built-in image enhancement for better recognition
- **Model Management**: Automatic model downloading and verification
- **Command-Line Interface**: Easy integration with external applications

## 📋 Prerequisites

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Python** | 3.8+ | 3.10+ |
| **RAM** | 4GB | 8GB+ |
| **CPU** | 2 cores | 4+ cores |
| **Storage** | 2GB | 5GB+ |
| **OS** | Linux/macOS/Windows | Linux |

### Python Dependencies

```bash
# Check Python version
python3 --version
# Should be 3.8 or higher

# Check pip
pip3 --version
# Should be available
```

### System Dependencies

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install python3-pip python3-venv libpng-dev libjpeg-dev libtiff-dev
```

#### macOS
```bash
brew install python3 libpng libjpeg libtiff
```

#### Windows
```bash
# Install from python.org
# Ensure Python is added to PATH
```

## 🛠️ Installation

### 1. Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python3 -m venv oemer-env

# Activate virtual environment
# Linux/macOS
source oemer-env/bin/activate

# Windows
oemer-env\Scripts\activate
```

### 2. Install OEMER

```bash
# Install OEMER using pip
pip install oemer

# Verify installation
python -c "import oemer; print('OEMER installed successfully')"
```

### 3. Install Additional Dependencies

```bash
# Install required packages for image processing
pip install pillow numpy opencv-python

# Install ONNX Runtime for better performance
pip install onnxruntime

# Install additional ML libraries
pip install scikit-learn
```

### 4. Verify Installation

```bash
# Check OEMER version
oemer --version

# Test basic functionality
oemer --help
```

## ⚙️ Configuration

### 1. Environment Variables

```bash
# Add to ~/.bashrc or ~/.zshrc
export OEMER_HOME="$HOME/.oemer"
export PYTHONPATH="$PYTHONPATH:$OEMER_HOME"

# For system-wide installation
export OEMER_HOME="/usr/local/lib/python3.x/site-packages/oemer"
```

### 2. Model Configuration

OEMER automatically downloads required models on first use. You can manually verify:

```bash
# Check model directory
ls -la ~/.oemer/checkpoints/

# Expected files:
# - model.onnx
# - metadata.pkl
# - seg_net/model.onnx
# - seg_net/metadata.pkl
# - unet_big/model.onnx
# - unet_big/metadata.pkl
```

### 3. Configuration File

Create `~/.oemer/config.json`:

```json
{
  "models": {
    "path": "~/.oemer/checkpoints",
    "auto_download": true,
    "verify_checksums": true
  },
  "processing": {
    "max_image_size": 4000,
    "min_image_size": 500,
    "enhance_images": true,
    "deskew": true
  },
  "output": {
    "format": "musicxml",
    "compression": false,
    "include_metadata": true
  },
  "logging": {
    "level": "INFO",
    "file": "~/.oemer/logs/oemer.log"
  }
}
```

## 🧪 Testing

### 1. Basic Test

```bash
# Test with a sample image
oemer path/to/your/test-image.png --output-path test-output.xml

# Check if output was created
ls -la test-output.xml
```

### 2. Integration Test

```bash
# Test within the Ensemble backend
cd backend
npm test

# Or run specific OEMER tests
node -e "
const OemerService = require('./services/oemer-service');
const service = new OemerService();
service.getStatus().then(console.log);
"
```

### 3. Performance Test

```bash
# Test with different image sizes
for size in 500 1000 2000 3000; do
  convert -size ${size}x${size} xc:white test-${size}.png
  time oemer test-${size}.png --output-path test-${size}-output.xml
done
```

## 🐛 Troubleshooting

### 1. Installation Issues

#### Problem: "ModuleNotFoundError: No module named 'oemer'"

```bash
# Solution 1: Reinstall with --user flag
pip install --user oemer

# Solution 2: Check Python path
python -c "import sys; print(sys.path)"

# Solution 3: Install in virtual environment
python3 -m venv oemer-env
source oemer-env/bin/activate
pip install oemer
```

#### Problem: "Permission denied" during installation

```bash
# Solution 1: Use --user flag
pip install --user oemer

# Solution 2: Use sudo (not recommended)
sudo pip install oemer

# Solution 3: Create virtual environment
python3 -m venv oemer-env
source oemer-env/bin/activate
pip install oemer
```

### 2. Model Issues

#### Problem: "Model files not found"

```bash
# Solution 1: Let OEMER download models automatically
oemer --help

# Solution 2: Manually download models
mkdir -p ~/.oemer/checkpoints
# Download models from OEMER repository and place in ~/.oemer/checkpoints/

# Solution 3: Check model permissions
chmod -R 755 ~/.oemer/checkpoints/
```

#### Problem: "Model checksum verification failed"

```bash
# Solution 1: Delete corrupted models
rm -rf ~/.oemer/checkpoints/*
# OEMER will redownload them

# Solution 2: Verify model integrity
python -c "
import oemer
import os
models_path = oemer.MODULE_PATH + '/checkpoints'
for root, dirs, files in os.walk(models_path):
    for file in files:
        if file.endswith('.onnx') or file.endswith('.pkl'):
            print(f'Checking: {os.path.join(root, file)}')
"
```

### 3. Image Processing Issues

#### Problem: "Image format not supported"

```bash
# Solution 1: Convert image to supported format
convert input.jpg input.png  # Using ImageMagick
# Or
python3 -c "
from PIL import Image
img = Image.open('input.jpg')
img.save('input.png')
"

# Solution 2: Check image format
file input.jpg
```

#### Problem: "Image too large/small"

```bash
# Solution 1: Resize image
convert input.jpg -resize 2000x2000 input-resized.jpg

# Solution 2: Check image dimensions
python3 -c "
from PIL import Image
img = Image.open('input.jpg')
print(f'Size: {img.size}')
print(f'Mode: {img.mode}')
"
```

### 4. Performance Issues

#### Problem: "Processing is very slow"

```bash
# Solution 1: Check CPU usage
top
htop

# Solution 2: Monitor memory usage
free -h
python3 -c "import psutil; print(psutil.virtual_memory())"

# Solution 3: Check for background processes
ps aux | grep oemer
```

#### Problem: "Memory usage too high"

```bash
# Solution 1: Process smaller images
convert large-image.jpg -resize 1000x1000 smaller-image.jpg

# Solution 2: Increase swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Solution 3: Use system monitoring
python3 -c "
import psutil
import time
while True:
    mem = psutil.virtual_memory()
    print(f'Memory: {mem.percent}% used')
    time.sleep(5)
"
```

## ⚡ Performance Optimization

### 1. System Optimization

#### CPU Optimization
```bash
# Check CPU governor
cpufreq-info

# Set to performance mode
sudo cpufreq-set -g performance

# For Intel processors
sudo apt install cpufrequtils
echo 'GOVERNOR="performance"' | sudo tee /etc/default/cpufrequtils
sudo systemctl restart cpufrequtils
```

#### Memory Optimization
```bash
# Check current memory settings
free -h

# Adjust swappiness
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
sudo sysctl -p

# Clear cache periodically
echo 'echo 3 > /proc/sys/vm/drop_caches' | sudo tee /usr/local/bin/clearcache
sudo chmod +x /usr/local/bin/clearcache
```

### 2. OEMER Optimization

#### Model Optimization
```bash
# Use ONNX Runtime for better performance
pip install onnxruntime

# Configure OEMER for CPU optimization
export OEMER_BACKEND=cpu
export OEMER_NUM_THREADS=4
```

#### Image Processing Optimization
```bash
# Preprocess images before OCR
python3 -c "
from PIL import Image, ImageEnhance
import numpy as np

def preprocess_image(input_path, output_path):
    img = Image.open(input_path)
    
    # Convert to grayscale
    img = img.convert('L')
    
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2.0)
    
    # Sharpen
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(2.0)
    
    # Resize if too large
    if max(img.size) > 2000:
        img.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
    
    img.save(output_path, 'PNG', quality=100)

preprocess_image('input.jpg', 'optimized.png')
"
```

### 3. Batch Processing Optimization

```bash
# Parallel processing script
#!/bin/bash
# process_batch.sh

INPUT_DIR="input_images"
OUTPUT_DIR="output_xml"
mkdir -p "$OUTPUT_DIR"

for image in "$INPUT_DIR"/*.png; do
    filename=$(basename "$image")
    output_file="$OUTPUT_DIR/${filename%.*}.xml"
    
    echo "Processing: $filename"
    oemer "$image" --output-path "$output_file" &
    
    # Limit to 4 concurrent processes
    if (( $(jobs -r | wc -l) >= 4 )); then
        wait -n
    fi
done

wait
echo "Batch processing completed"
```

## 🔧 Common Issues

### 1. CUDA/GPU Issues

#### Problem: "CUDA not available" warnings

```bash
# Check CUDA installation
nvidia-smi
nvcc --version

# Install CUDA if needed
# Download from https://developer.nvidia.com/cuda-downloads

# Set environment variables
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```

#### Problem: "GPU memory insufficient"

```bash
# Check GPU memory
nvidia-smi

# Reduce batch size or image size
export OEMER_BATCH_SIZE=1
convert large-image.jpg -resize 1000x1000 smaller-image.jpg
```

### 2. Python Environment Issues

#### Problem: "Conflicting Python packages"

```bash
# Create clean environment
python3 -m venv clean-env
source clean-env/bin/activate
pip install oemer

# Check for conflicts
pip list

# Uninstall conflicting packages
pip uninstall package-name
```

#### Problem: "Import errors"

```bash
# Check Python path
python -c "import sys; print(sys.path)"

# Check package installation
python -c "import oemer; print('OEMER path:', oemer.__file__)"

# Reinstall package
pip uninstall oemer
pip install oemer
```

### 3. File Permission Issues

#### Problem: "Permission denied" for output files

```bash
# Check permissions
ls -la ~/.oemer/
ls -la output.xml

# Fix permissions
chmod 755 ~/.oemer/
chmod 644 output.xml

# Run with correct user
whoami
# Should be same user that owns the files
```

## 🎛️ Advanced Configuration

### 1. Custom Model Configuration

```bash
# Create custom model directory
mkdir -p ~/.oemer/custom_models

# Use custom models
oemer input.png --model-path ~/.oemer/custom_models --output-path output.xml
```

### 2. Advanced Image Processing

```python
# advanced_preprocessing.py
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

def advanced_preprocessing(input_path, output_path):
    img = Image.open(input_path)
    
    # Convert to grayscale
    img = img.convert('L')
    
    # Apply adaptive thresholding
    img = img.filter(ImageFilter.MedianFilter(size=3))
    
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(3.0)
    
    # Remove noise
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    
    # Resize to optimal size
    base_width = 2000
    w_percent = base_width / float(img.size[0])
    h_size = int(float(img.size[1]) * float(w_percent))
    img = img.resize((base_width, h_size), Image.Resampling.LANCZOS)
    
    img.save(output_path, 'PNG', quality=100)
```

### 3. Batch Processing with Progress

```python
# batch_processor.py
import os
import time
from PIL import Image
import subprocess
from tqdm import tqdm

def batch_process(input_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    
    image_files = [f for f in os.listdir(input_dir) 
                  if f.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp'))]
    
    print(f"Found {len(image_files)} images to process")
    
    for filename in tqdm(image_files, desc="Processing images"):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, f"{os.path.splitext(filename)[0]}.xml")
        
        # Preprocess image
        preprocessed_path = os.path.join(output_dir, f"preprocessed_{filename}")
        advanced_preprocessing(input_path, preprocessed_path)
        
        # Process with OEMER
        start_time = time.time()
        try:
            result = subprocess.run(
                ['oemer', preprocessed_path, '--output-path', output_path],
                capture_output=True, text=True, timeout=300
            )
            
            if result.returncode == 0:
                processing_time = time.time() - start_time
                print(f"✓ {filename}: {processing_time:.2f}s")
            else:
                print(f"✗ {filename}: {result.stderr}")
                
        except subprocess.TimeoutExpired:
            print(f"✗ {filename}: Timeout")
        except Exception as e:
            print(f"✗ {filename}: {str(e)}")
        
        # Clean up preprocessed file
        if os.path.exists(preprocessed_path):
            os.remove(preprocessed_path)
```

## ❓ FAQ

### Q: What image formats are supported?
A: OEMER supports PNG, JPEG, JPG, TIFF, and BMP formats. For best results, use PNG with high resolution (300 DPI or higher).

### Q: How long does processing take?
A: Processing time varies based on image size and complexity. Typical processing times:
- Small images (500x500): 10-30 seconds
- Medium images (1000x1000): 30-60 seconds
- Large images (2000x2000): 1-3 minutes

### Q: Can I process multiple images at once?
A: Yes! You can use batch processing scripts to process multiple images sequentially or in parallel.

### Q: What are the system requirements for optimal performance?
A: For optimal performance:
- 8GB+ RAM
- 4+ CPU cores
- SSD storage
- GPU (optional, for faster processing)

### Q: How do I improve recognition accuracy?
A: To improve accuracy:
1. Use high-quality, high-resolution images
2. Ensure good lighting and contrast
3. Remove any annotations or markings
4. Use image preprocessing to enhance quality
5. Ensure the sheet music is properly aligned

### Q: Can I use OEMER commercially?
A: Please check the OEMER license terms for commercial usage. Some licenses may require attribution or have restrictions.

### Q: How do I update OEMER?
A: To update OEMER:
```bash
pip install --upgrade oemer
# Or
pip install oemer --upgrade
```

### Q: Where are the logs stored?
A: OEMER logs are typically stored in:
- `~/.oemer/logs/oemer.log`
- `/var/log/oemer/` (system installations)
- You can configure the log location in the config file

### Q: How do I report bugs or issues?
A: Please report bugs through:
1. GitHub issues
2. Email to the development team
3. Include your system information, error messages, and sample images if possible

### Q: Can I customize the output format?
A: OEMER primarily outputs MusicXML format. You can convert MusicXML to other formats using additional tools like MuseScore or online converters.

## 📞 Support

### Getting Help

1. **Check this guide** first for common issues
2. **Review the logs** for error messages
3. **Search existing issues** on GitHub
4. **Create a new issue** with detailed information

### Issue Template

When reporting issues, please include:

```markdown
## Description
Brief description of the issue

## Environment
- OS: [e.g., Ubuntu 20.04]
- Python version: [e.g., 3.9.7]
- OEMER version: [e.g., 1.0.0]
- System specs: [e.g., 8GB RAM, 4 CPU cores]

## Steps to Reproduce
1. [First step]
2. [Second step]
3. [Third step]

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Error Messages
```
[Error message here]
```

## Additional Information
Any other relevant information
```

### Community Resources

- **GitHub Repository**: [Link to OEMER GitHub]
- **Documentation**: [Link to documentation]
- **Discord/Forum**: [Link to community]
- **Email Support**: [Support email]

---

**Happy OCR-ing!** 🎵

*Remember: Good input quality leads to good output quality. Take time to prepare your sheet music images for the best results.*
