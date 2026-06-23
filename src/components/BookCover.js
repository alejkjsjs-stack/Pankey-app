import React from 'react';

export const GENRE_PALETTE = {
  "Ficción":      {from:"#1a1a2e",to:"#16213e",spine:"#e94560",text:"#eaeaea"},
  "Romance":      {from:"#2d1b2e",to:"#11022e",spine:"#c77dff",text:"#f8edff"},
  "Misterio":     {from:"#0d1117",to:"#161b22",spine:"#58a6ff",text:"#e6edf3"},
  "Fantasía":     {from:"#0f0c29",to:"#302b63",spine:"#f5a623",text:"#fff8e7"},
  "Clásico":      {from:"#1c1408",to:"#2c200c",spine:"#c4820a",text:"#fdf4e3"},
  "Terror":       {from:"#0a0a0a",to:"#1a0a0a",spine:"#ff4444",text:"#ffe0e0"},
  "Historia":     {from:"#1a1200",to:"#2e1f00",spine:"#d4a030",text:"#fff8e1"},
  "Ciencia":      {from:"#001a2c",to:"#003459",spine:"#00b4d8",text:"#e0f7ff"},
  "Autoayuda":    {from:"#0a1a0a",to:"#1a3a1a",spine:"#4abca0",text:"#e0fff8"},
  "Mágico":       {from:"#1a0a2e",to:"#2e1a4a",spine:"#c77dff",text:"#f0e8ff"},
  "Novela":       {from:"#1a1008",to:"#2a1c10",spine:"#e07040",text:"#fff0e8"},
  // ¡Nuevos géneros añadidos!
  "Manga":        {from:"#f5f5f5",to:"#dcdcdc",spine:"#1a1a1a",text:"#1a1a1a"},
  "Cómic":        {from:"#1a2980",to:"#26d0ce",spine:"#ffcc00",text:"#ffffff"},
  "Novela Ligera":{from:"#ffecd2",to:"#fcb69f",spine:"#ff758c",text:"#1a1a1a"},
  "Poesía":       {from:"#4facfe",to:"#00f2fe",spine:"#ffffff",text:"#ffffff"},
  "Biografía":    {from:"#3f2b96",to:"#a8c0ff",spine:"#a8c0ff",text:"#ffffff"},
  "Ensayo":       {from:"#606c88",to:"#3f4c6b",spine:"#e0e0e0",text:"#ffffff"},
  "default":      {from:"#1a1214",to:"#2a1c20",spine:"#e03030",text:"#fde8e8"},
};

export const getGenrePalette = (genre) => GENRE_PALETTE[genre] || GENRE_PALETTE.default;

export function BookCover({book, size="md", floating=false, onClick}) {
  const pal = getGenrePalette(book?.genre);
  const dims = {
    sm:{w:52,h:74,spine:6,titleSize:7,authorSize:6},
    md:{w:96,h:138,spine:10,titleSize:11,authorSize:9},
    lg:{w:130,h:186,spine:14,titleSize:14,authorSize:10},
    hero:{w:110,h:158,spine:12,titleSize:12,authorSize:9},
  };
  const d = dims[size] || dims.md;
  const title = book?.title || "Sin título";
  const author = book?.author || "";

  return(
    <div onClick={onClick} style={{position:"relative",width:d.w+d.spine,height:d.h,flexShrink:0,cursor:onClick?"pointer":"default",filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.45))",transform:floating?"rotate(-2deg)":"none",transition:"transform 0.3s ease",animation:floating?"coverFloat 5s ease-in-out infinite":"none"}}>
      <div style={{position:"absolute",left:0,top:0,width:d.spine,height:d.h,background:pal.spine,borderRadius:"3px 0 0 3px",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)",fontSize:d.authorSize-1,fontWeight:700,color:pal.from,letterSpacing:"0.08em",maxHeight:d.h-12,overflow:"hidden",fontFamily:"'Noto Serif JP',serif"}}>{title.slice(0,18)}</div>
      </div>
      <div style={{position:"absolute",left:d.spine,top:0,width:d.w,height:d.h,borderRadius:"0 4px 4px 0",overflow:"hidden",background:`linear-gradient(155deg, ${pal.from} 0%, ${pal.to} 100%)`}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.02) 2px,rgba(255,255,255,0.02) 3px)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:pal.spine,opacity:0.9}}/>
        {book?.genre&&(
          <div style={{position:"absolute",top:10,right:8,fontSize:d.authorSize-2,fontWeight:700,color:pal.spine,fontFamily:"'Share Tech Mono',monospace",letterSpacing:"0.1em",textTransform:"uppercase",opacity:0.9}}>{book.genre.slice(0,8)}</div>
        )}
        <div style={{position:"absolute",bottom:-20,right:-20,width:d.w*0.7,height:d.w*0.7,borderRadius:"50%",border:`1px solid ${pal.spine}18`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",left:10,right:10,top:"30%",color:pal.text,fontFamily:"'Playfair Display',Georgia,serif",fontWeight:900,fontSize:d.titleSize,lineHeight:1.25,fontStyle:"italic",textShadow:"0 2px 8px rgba(0,0,0,0.3)",wordBreak:"break-word"}}>
          {title}
        </div>
        <div style={{position:"absolute",bottom:12,left:10,right:10,color:pal.spine,fontSize:d.authorSize,fontWeight:600,fontFamily:"'Noto Serif JP',serif",letterSpacing:"0.04em",opacity:0.9}}>
          {author}
        </div>
      </div>
    </div>
  );
}