import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Card from './Card';



function CardsGrid({ items, setNoteIdBeingUpdated, deleteNote }) {
    return (
        <div className="col-10 mx-auto bg-dark text-light">
        <ResponsiveMasonry columnsCountBreakPoints={
            { 350: 2, 650: 3, 1000: 4, 1200: 5, 1400: 6 }}>
            <Masonry columnsCount={3}>
                {items.map((note) => (
                    // <div className='col-6'>
                    // <div className='col-sm-4 col-md-3 py-3'>
                    // <div className="col-sm-6 col-md-4 col-lg-2">
                    <Card title={note.title} content={note.content}
                        onUpdate={() => setNoteIdBeingUpdated(note)}
                        onDelete={() => { if (window.confirm(`Are you sure you want to delete the item "${note.title}"?`)) deleteNote(note.noteId) }}
                    />
                    // </div>
                ))}
                {/* <Alert onClick={() => console.log("Alert Clicked!")} onClose={() => null}>
            This is a ReactNode <div>children prop</div>
            </Alert> */}

            </Masonry>
        </ResponsiveMasonry>
        </div>
    )
}

export default CardsGrid