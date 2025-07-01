import React, { useState } from 'react';
import { SafeAreaView, View, Text, useWindowDimensions, ScrollView } from 'react-native';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PortfolioItem } from '../../src/components/ui/PortfolioItem';

const initialItems = [
  { id: '1', title: 'Personal Website', description: 'A portfolio website built with React and Tailwind CSS.' },
  { id: '2', title: 'Mobile App', description: 'A cross-platform mobile app using React Native.' },
  { id: '3', title: 'Open Source Contribution', description: 'Contributed to a popular open source project.' },
];

export default function PortfolioScreen() {
  const [items, setItems] = useState(initialItems);
  const { width } = useWindowDimensions();
  const isMobile = width < 600;

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-2 md:px-16 py-4">
      <Text className="text-2xl md:text-3xl font-bold mb-4 text-center">My Portfolio</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="portfolio-list">
            {(provided) => (
              <View ref={provided.innerRef} {...provided.droppableProps} className="w-full max-w-2xl mx-auto">
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <View
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`mb-2 ${snapshot.isDragging ? 'opacity-70' : ''}`}
                        style={provided.draggableProps.style}
                      >
                        <PortfolioItem title={item.title} description={item.description} />
                      </View>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </View>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollView>
    </SafeAreaView>
  );
} 