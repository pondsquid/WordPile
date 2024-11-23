// import React from "react";
// import { useDragOverlay } from "../hooks/useDragOverlay";

// const DragOverlay = () => {
//   const { isDragging, dragLetter, dragX, dragY } = useDragOverlay();

//   if (!isDragging || !dragLetter) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: dragY,
//         left: dragX,
//         transform: "translate(-50%, -50%)",
//         pointerEvents: "none",
//         zIndex: 1000,
//       }}
//     >
//       <div
//         className="p-4 bg-blue-500 text-white font-bold rounded-md shadow-md"
//         style={{
//           width: "64px",
//           height: "64px",
//           fontSize: "32px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {dragLetter}
//       </div>
//     </div>
//   );
// };

// export default DragOverlay;




// import React from "react";
// import { useDragOverlay } from "../hooks/useDragOverlay";

// const DragOverlay = () => {
//     const { isDragging, dragLetter, dragX, dragY } = useDragOverlay();

//     if (!isDragging || !dragLetter) return null;

//     return (
//         <div
//             style={{
//                 position: "fixed",
//                 top: dragY,
//                 left: dragX,
//                 pointerEvents: "none",
//                 transform: "translate(-50%, -50%)",
//                 zIndex: 1000,
//             }}
//         >
//             <div
//                 className="text-white font-bold"
//                 style={{
//                     backgroundColor: "#3b82f6", // Ensure the exact blue matches the tile
//                     width: "64px",
//                     height: "64px",
//                     fontSize: "32px",
//                     borderRadius: "8px", // Ensure smooth corners
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "hidden", // Prevent artifacts from escaping bounds
//                     boxShadow: "none",
//                     border: "none",
//                     margin: 0,
//                     padding: 0,
//                 }}
//             >
//                 {dragLetter}
//             </div>
//         </div>

//     );
// };

// export default DragOverlay;
