// import React from 'react';
// import { CheckSquare, Square, X, Edit3, Users, Trash2 } from 'lucide-react';
// import { Button } from '../ui/button';

import { CheckSquare, Edit3, Square, Users, X } from "lucide-react";
import { Button } from "../ui/button";

// export const MultiSelectToolbar = ({
//     multiSelectState,
//     selectedCount,
//     totalCount,
//     onToggleMode,
//     onSelectAll,
//     onClearSelection,
//     onBulkEdit
// }) => {
//     return (
//         <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//                 <Button
//                     onClick={onToggleMode}
//                     variant={multiSelectState.isActive ? "default" : "outline"}
//                     className={`flex items-center space-x-2 ${multiSelectState.isActive
//                         ? 'bg-blue-600 text-white hover:bg-blue-700'
//                         : 'text-gray-700 hover:bg-gray-50'
//                         }`}
//                 >
//                     <Users className="w-4 h-4" />
//                     <span>
//                         {multiSelectState.isActive ? 'Salir del modo múltiple' : 'Edición múltiple'}
//                     </span>
//                 </Button>

//                 {multiSelectState.isActive && (
//                     <>
//                         <div className="flex items-center space-x-2 text-sm text-gray-600">
//                             <span className="font-medium">
//                                 {selectedCount} de {totalCount} seleccionados
//                             </span>
//                         </div>

//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={selectedCount === totalCount ? onClearSelection : onSelectAll}
//                             className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50"
//                         >
//                             {selectedCount === totalCount ? (
//                                 <>
//                                     <Square className="w-4 h-4" />
//                                     <span>Deseleccionar todo</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <CheckSquare className="w-4 h-4" />
//                                     <span>Seleccionar todo</span>
//                                 </>
//                             )}
//                         </Button>
//                     </>
//                 )}
//             </div>

//             {multiSelectState.isActive && selectedCount > 0 && (
//                 <div className="flex items-center space-x-2">
//                     <Button
//                         onClick={onBulkEdit}
//                         className="flex items-center space-x-2 bg-green-600 text-white hover:bg-green-700"
//                     >
//                         <Edit3 className="w-4 h-4" />
//                         <span>Editar seleccionados ({selectedCount})</span>
//                     </Button>

//                     <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={onClearSelection}
//                         className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                     >
//                         <X className="w-4 h-4" />
//                     </Button>
//                 </div>
//             )}
//         </div>
//         // <div className="bg-green-50 rounded-lg">
//         // </div>
//     );
// };

export const MultiSelectToolbar = ({
    multiSelectState,
    selectedCount,
    totalCount,
    onToggleMode,
    onSelectAll,
    onClearSelection,
    onBulkEdit
}) => {
    return (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 mr-4">
            <div className="flex items-center space-x-4">
                <Button
                    onClick={onToggleMode}
                    variant={multiSelectState.isActive ? "default" : "outline"}
                    className={`flex items-center space-x-2 ${multiSelectState.isActive
                        ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-600'
                        }`}
                >
                    <Users className="w-4 h-4" />
                    <span>
                        {multiSelectState.isActive ? 'Salir del modo múltiple' : 'Edición múltiple'}
                    </span>
                </Button>

                {multiSelectState.isActive && (
                    <>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-slate-400">
                            <span className="font-medium">
                                {selectedCount} de {totalCount} seleccionados
                            </span>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={selectedCount === totalCount ? onClearSelection : onSelectAll}
                            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30"
                        >
                            {selectedCount === totalCount ? (
                                <>
                                    <Square className="w-4 h-4" />
                                    <span>Deseleccionar todo</span>
                                </>
                            ) : (
                                <>
                                    <CheckSquare className="w-4 h-4" />
                                    <span>Seleccionar todo</span>
                                </>
                            )}
                        </Button>
                    </>
                )}
            </div>

            {multiSelectState.isActive && selectedCount > 0 && (
                <div className="flex items-center space-x-2">
                    <Button
                        onClick={onBulkEdit}
                        className="flex items-center space-x-2 bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    >
                        <Edit3 className="w-4 h-4" />
                        <span>Editar seleccionados ({selectedCount})</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearSelection}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};