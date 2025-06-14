import { useRef, useState, useCallback } from "react";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<"left" | "right" | null>(
    null
  );

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = useCallback(() => {
    setIsDraggingLeft(true);
  }, []);

  const handleRightMouseDown = useCallback(() => {
    setIsDraggingRight(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
        const container = rulerRef.current.querySelector("#ruler-container");
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const relativeX = e.clientX - containerRect.left;
          const rawPosition = Math.max(0, Math.min(816, relativeX));

          if (isDraggingLeft) {
            const maxLeftPosition = 816 - rightMargin - 100;
            const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
            setLeftMargin(newLeftPosition);
          } else if (isDraggingRight) {
            const maxRightPosition = 816 - (leftMargin + 100);
            const newRightPosition = Math.max(816 - rawPosition, 0);
            const constrainedRightPosition = Math.min(
              newRightPosition,
              maxRightPosition
            );
            setRightMargin(constrainedRightPosition);
          }
        }
      }
    },
    [isDraggingLeft, isDraggingRight, leftMargin, rightMargin]
  );

  const handleMouseUp = useCallback(() => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  }, []);

  const handleLeftDoubleClick = useCallback(() => {
    setLeftMargin(56);
  }, []);

  const handleRightDoubleClick = useCallback(() => {
    setRightMargin(56);
  }, []);

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-8 bg-gradient-to-b from-slate-50 to-slate-100 border-b-2 border-slate-200/80 flex items-end select-none print:hidden shadow-sm"
    >
      {/* Active area indicator */}
      <div
        className="absolute h-1 bg-gradient-to-r from-blue-400 to-indigo-500 top-0 opacity-30 transition-all duration-200"
        style={{
          left: `max(0px, calc(50% - 408px + ${leftMargin}px))`,
          right: `max(0px, calc(50% - 408px + ${rightMargin}px))`,
        }}
      />

      <div
        id="ruler-container"
        className="max-w-[816px] mx-auto w-full h-full relative"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          isHovered={hoveredMarker === "left"}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
          onMouseEnter={() => setHoveredMarker("left")}
          onMouseLeave={() => setHoveredMarker(null)}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          isHovered={hoveredMarker === "right"}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
          onMouseEnter={() => setHoveredMarker("right")}
          onMouseLeave={() => setHoveredMarker(null)}
        />

        {/* Ruler markings */}
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;
              const isMajor = marker % 10 === 0;
              const isMinor = marker % 5 === 0 && marker % 10 !== 0;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0 transition-all duration-150"
                  style={{ left: `${position}px` }}
                >
                  {isMajor && (
                    <>
                      <div className="absolute bottom-0 w-0.5 h-3 bg-slate-600 shadow-sm" />
                      <span className="absolute bottom-3.5 text-[9px] font-medium text-slate-600 transform -translate-x-1/2 tracking-tight">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}

                  {isMinor && (
                    <div className="absolute bottom-0 w-0.5 h-2 bg-slate-500" />
                  )}

                  {!isMajor && !isMinor && (
                    <div className="absolute bottom-0 w-px h-1 bg-slate-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  isHovered: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  isHovered,
  onMouseDown,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}: MarkerProps) => {
  return (
    <div
      className={`absolute top-0 w-5 h-full cursor-ew-resize z-10 group -ml-2.5 transition-all duration-200 ${
        isDragging ? "scale-110" : isHovered ? "scale-105" : ""
      }`}
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Marker icon */}
      <svg
        className={`absolute left-1/2 top-0 h-4 w-4 transform -translate-x-1/2 transition-all duration-200 ${
          isDragging ? "drop-shadow-lg" : isHovered ? "drop-shadow-md" : ""
        }`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2L22 12H2L12 2Z"
          fill={isDragging ? "#2563eb" : isHovered ? "#3b82f6" : "#60a5fa"}
          className="transition-all duration-200"
        />
      </svg>

      {/* Drag line */}
      <div
        className={`absolute left-1/2 top-4 transform -translate-x-1/2 transition-all duration-200 ${
          isDragging ? "opacity-100" : "opacity-0"
        }`}
        style={{
          height: "100vh",
          width: "2px",
          background:
            "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
          boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
          borderRadius: "1px",
        }}
      />

      {/* Hover indicator */}
      {isHovered && !isDragging && (
        <div
          className="absolute left-1/2 top-4 transform -translate-x-1/2 opacity-30"
          style={{
            height: "100vh",
            width: "1px",
            backgroundColor: "#60a5fa",
          }}
        />
      )}

      {/* Position tooltip */}
      {(isHovered || isDragging) && (
        <div
          className={`absolute ${
            isLeft ? "left-6" : "right-6"
          } top-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 transition-all duration-200 ${
            isDragging ? "opacity-100 scale-100" : "opacity-75 scale-95"
          }`}
        >
          {(((isLeft ? position : 816 - position) / 816) * 8.5 + 1).toFixed(1)}"
          <div
            className={`absolute top-2 w-0 h-0 border-t-4 border-t-slate-800 ${
              isLeft
                ? "border-r-4 border-r-transparent -left-1"
                : "border-l-4 border-l-transparent -right-1"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Ruler;
