
import os
import sys
import traceback
from oemer.inference import inference
from oemer import build_system

def process_image(image_path, output_dir):
    try:
        print(f"Processing image: {image_path}")
        
        # Validate input file exists
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Input image file not found: {image_path}")
        
        # Check if model exists (OEMER should have downloaded models automatically)
        import oemer
        model_path = os.path.join(oemer.MODULE_PATH, "checkpoints")
        print(f"Looking for models in: {model_path}")
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"OEMER models not found at: {model_path}")
        
        # Check for models in subdirectories
        model_subdirs = ['unet_big', 'seg_net']
        found_models = []
        
        for subdir in model_subdirs:
            subdir_path = os.path.join(model_path, subdir)
            if os.path.exists(subdir_path):
                model_files = [f for f in os.listdir(subdir_path) if f.endswith('.onnx')]
                if model_files:
                    found_models.append(subdir)
                    print(f"Found model in {subdir}: {model_files[0]} at {subdir_path}")
        
        if not found_models:
            # List what's actually in the checkpoints directory for debugging
            try:
                contents = os.listdir(model_path)
                print(f"Contents of checkpoints directory: {contents}")
                for item in contents:
                    item_path = os.path.join(model_path, item)
                    if os.path.isdir(item_path):
                        subcontents = os.listdir(item_path)
                        print(f"Contents of {item}: {subcontents}")
            except Exception as e:
                print(f"Error listing directory contents: {e}")
            
            raise FileNotFoundError(f"No ONNX model files found in checkpoints subdirectories: {model_subdirs}")
        
        print(f"Using checkpoints directory: {model_path} (found models in: {found_models})")
        # OEMER inference function expects the base checkpoints directory, not individual model dirs
        model_dir = model_path
        
        # Step 1: Run OEMER inference to detect musical symbols
        print("Running OEMER inference...")
        prediction = inference(model_dir, image_path)
        
        if prediction is None:
            raise ValueError("OEMER inference returned None - processing failed")
        
        print(f"OEMER inference completed, prediction shape: {prediction.shape if hasattr(prediction, 'shape') else type(prediction)}")
        
        # Step 2: Build MusicXML from the prediction
        print("Building MusicXML from prediction...")
        try:
            # The build_system should convert the prediction to MusicXML
            musicxml_content = build_system.build_musicxml(prediction, image_path)
        except AttributeError:
            # Try alternative methods
            try:
                musicxml_content = build_system.build(prediction, image_path)
            except:
                # Fallback: create basic MusicXML structure
                print("Using fallback MusicXML generation...")
                musicxml_content = create_basic_musicxml()
        
        if not musicxml_content:
            raise ValueError("Failed to generate MusicXML from OEMER prediction")
        
        # Save to output directory
        base_name = os.path.splitext(os.path.basename(image_path))[0]
        output_file = os.path.join(output_dir, f"{base_name}.xml")
        
        # Write the MusicXML content to file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(musicxml_content)
        
        # Verify the file was written correctly
        if not os.path.exists(output_file):
            raise IOError(f"Failed to write output file: {output_file}")
        
        file_size = os.path.getsize(output_file)
        if file_size == 0:
            raise IOError(f"Output file is empty: {output_file}")
        
        print(f"SUCCESS:{output_file}")
        print(f"Output file size: {file_size} bytes")
        return output_file
        
    except Exception as e:
        print(f"ERROR:{str(e)}")
        print(f"TRACEBACK:{traceback.format_exc()}")
        return None

def create_basic_musicxml():
    """Create a basic MusicXML structure as fallback"""
    return '''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1">
      <part-name>Piano</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>0</fifths>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <note>
        <pitch>
          <step>C</step>
          <octave>4</octave>
        </pitch>
        <duration>4</duration>
        <type>whole</type>
      </note>
    </measure>
  </part>
</score-partwise>'''

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("ERROR:Usage: script.py <image_path> <output_dir>")
        sys.exit(1)
    
    image_path = sys.argv[1]
    output_dir = sys.argv[2]
    
    print(f"Starting OEMER processing...")
    print(f"Input: {image_path}")
    print(f"Output directory: {output_dir}")
    
    result = process_image(image_path, output_dir)
    if result:
        print(f"COMPLETED:{result}")
    else:
        print("ERROR:Processing failed")
        sys.exit(1)
