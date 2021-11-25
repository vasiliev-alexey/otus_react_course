import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const helpText = `
### Правила игры

Случайные фигурки тетрамино падают сверху в прямоугольный стакан шириной 10 и высотой 20 клеток.  
В полёте игрок может поворачивать фигурку на 90° и двигать её по горизонтали.  
Также можно «сбрасывать» фигурку, то есть ускорять её падение, когда уже решено, куда фигурка должна упасть.  
Фигурка летит до тех пор, пока не наткнётся на другую фигурку либо на дно стакана.  
Если при этом заполнился горизонтальный ряд из 10 клеток, он пропадает и всё, что выше него, опускается на одну клетку.
Дополнительно показывается фигурка, которая будет следовать после текущей — это подсказка, 
которая позволяет игроку планировать действия. Темп игры постепенно увеличивается.  
Игра заканчивается, когда новая фигурка не может поместиться в стакан. Игрок получает очки за каждый заполненный ряд, 
поэтому его задача — заполнять ряды, не заполняя сам стакан (по вертикали) как можно дольше,
чтобы таким образом получить как можно больше очков.  

  
### Элементы управления

  * Левая стрелка (⬅️) перемещение фигуры влево 
  * Правая стрелка (➡️) перемещение фигуры вправо 
  * Нижняя стрелка (⬇️) перемещение фигуры вниз (сброс)
  * Пробел - вращение фигуры 
  * Pause - установка игры на паузу

### Уровни
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
### Рейтинги
`;

const Help: React.FC = () => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{helpText}</ReactMarkdown>;
};

export default Help;