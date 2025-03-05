import Image from "next/image";


export default function Modal({
    image,
    title,
    onClose,
}: {
    image: any;
    title: string,
    onClose: () => void;
}) {
    // Prevent click propagation on modal content
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
            onClick={onClose} // Close modal when backdrop is clicked
        >
            <div
                className="bg-tertiary rounded-lg p-4 w-[40%] h-[100%] relative"
                onClick={handleModalClick} // Prevent event from reaching the backdrop
            >
                {/* Header Section */}
                <header className="relative w-full flex justify-center items-center py-1">
                    <div className="absolute top-0 w-10 border-2 border-primary"></div>
                    <h2 className="text-2xl text-center font-semibold">{title}</h2>
                    <button
                        className="absolute top-2 right-2 flex items-center justify-center rounded-md w-[20px] h-[20px] text-black border-2 border-black text-2xl hover:text-gray-800"
                        onClick={onClose}
                    >
                        <span className="-mt-1">x</span>
                    </button>
                </header>

                {/* Image Section */}
                <main className="w-full h-full overflow-hidden relative">
                    <Image
                        src={image}
                        alt="Notice Image"
                        fill // Make the image fill the container while maintaining aspect ratio
                        objectFit="contain" // Ensure the entire image fits within the container without distortion
                    />
                </main>
            </div>
        </div>



    );
}
