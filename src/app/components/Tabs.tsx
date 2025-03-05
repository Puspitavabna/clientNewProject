import React, { useState, useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';

interface TabsComponentProps {
  onSave: (type: 'typed' | 'drawn', content: string) => void; // Callback to parent
}

const TabsComponent: React.FC<TabsComponentProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [typedSignature, setTypedSignature] = useState<string>(''); // For typed signature
  const signaturePadRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadInstance = useRef<SignaturePad | null>(null);
  const [drawnSignature, setDrawnSignature] = useState<string>(''); // Holds drawn signature

  // Initialize SignaturePad when switching to 'Draw' tab
  useEffect(() => {
    if (activeTab === 'tab2') {
      // Initialize SignaturePad if it's the first time or after clearing
      if (!signaturePadInstance.current && signaturePadRef.current) {
        signaturePadInstance.current = new SignaturePad(signaturePadRef.current);
      }

      // Clear the drawn signature when switching to the Draw tab
      setDrawnSignature('');
      onSave('drawn', ''); // Clear the parent stored drawn signature

      // Reset the canvas if it's already initialized
      if (signaturePadInstance.current) {
        signaturePadInstance.current.clear();
      }

      // Monitor drawing completion
      const checkDrawingCompletion = () => {
        if (signaturePadInstance.current && !signaturePadInstance.current.isEmpty()) {
          const dataUrl = signaturePadInstance.current.toDataURL();
          setDrawnSignature(dataUrl); // Update the drawn signature state
          onSave('drawn', dataUrl); // Notify the parent with the drawn signature
        } else {
          setDrawnSignature(''); // Clear if drawing is empty
          onSave('drawn', ''); // Notify the parent with an empty string
        }
      };

      // Set up the interval to check drawing completion
      const interval = setInterval(checkDrawingCompletion, 500); // Check every 500ms

      // Cleanup the interval when the component is unmounted or when switching tabs
      return () => {
        clearInterval(interval);
      };
    }

    // Clean up signaturePadInstance when switching away from the 'Draw' tab
    return () => {
      if (signaturePadInstance.current) {
        signaturePadInstance.current.clear();
      }
    };
  }, [activeTab, onSave]); // Only re-run when activeTab changes

  // Handle tab switching
  const showTab = (tabId: string) => {
    setActiveTab(tabId);

    if (tabId === 'tab1') {
      // Reset typed signature when switching to "Type" tab
      setTypedSignature('');
      onSave('typed', ''); // Reset the parent typed signature
    }
  };

  // Handle typed signature input
  const handleTypedSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedSignature(e.target.value); // Update typed signature state
  };

  // Handle blur event for typed signature to update parent when leaving the input
  const handleTypedSignatureBlur = () => {
    if (typedSignature) {
      onSave('typed', typedSignature); // Update parent with typed signature when leaving the input
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-center pb-0 w-30 py-1 border-gray-300">
        <div
          className={`cursor-pointer border-2 px-3 py-1 font-semibold ${
            activeTab === 'tab1' ? 'bg-[#4fb8c2] text-white font-bold' : 'text-gray-600'
          }`}
          onClick={() => showTab('tab1')}
        >
          Type
        </div>
        <div
          className={`cursor-pointer border-2 px-3 py-1 font-semibold ${
            activeTab === 'tab2' ? 'bg-[#4fb8c2] text-white font-bold' : 'text-gray-600'
          }`}
          onClick={() => showTab('tab2')}
        >
          Draw
        </div>
      </div>

      {/* Typed Signature Tab */}
      <div
        className="mt-1"
        style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}
      >
        <input
          type="text"
          value={typedSignature}
          onChange={handleTypedSignatureChange}
          onBlur={handleTypedSignatureBlur} // Update parent when leaving the input
          placeholder="Type your signature"
          className="mt-1 px-3 py-1 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Drawn Signature Tab */}
      <div
        className="mt-1"
        style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}
      >
        <canvas
          ref={signaturePadRef}
          width="300"
          height="200"
          className="border border-gray-300"
        ></canvas>
      </div>
    </div>
  );
};

export default TabsComponent;
