'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Photo } from '../types';

interface ReorderProps {
  photos: Photo[];
  onReorderComplete: (photos: Photo[]) => void;
  onBack: () => void;
}

interface SortablePhotoProps {
  photo: Photo;
  index: number;
}

function SortablePhoto({ photo, index }: SortablePhotoProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group cursor-move"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl">
        <img
          src={photo.url}
          alt={photo.filename}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
          {index + 1}
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white rounded-lg px-2 py-1 text-xs backdrop-blur-sm">
          Drag to reorder
        </div>
        <div className="p-3 bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0">
          <p className="text-white text-sm font-medium truncate">
            {photo.filename}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Reorder({ photos, onReorderComplete, onBack }: ReorderProps) {
  const [items, setItems] = useState(photos);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }
  };

  const handleSubmit = () => {
    onReorderComplete(items);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Arrange Room Order
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Drag and drop to reorder how rooms appear in your walkthrough video
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          Tip: Start with the entrance or most impressive room to grab viewers' attention
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((photo, index) => (
              <SortablePhoto key={photo.id} photo={photo} index={index} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
        >
          Generate Walkthrough
        </button>
      </div>
    </div>
  );
}
