import React, { useEffect } from 'react'

function Pagination({currentPage, setCurrentPage,totalPages, setTotalPages}) {
    useEffect(() => {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const ellipsis = document.getElementById('ellipsis');
        const page1 = document.getElementById('page1');
        const page2 = document.getElementById('page2');
        const page99 = document.getElementById('page99');
        const page100 = document.getElementById('page100');

        // Function to go to the previous page
        function goToPrevPage() {
            if (currentPage > 1) {
                setCurrentPage((e) => e - 1);
            }
        }

        // Function to go to the next page
        function goToNextPage() {
            if (currentPage < totalPages) {
                setCurrentPage((e) => e + 1);
            }
        }

        // Function to update the pagination buttons based on the current page
        function updatePagination() {
            // Reset all buttons
            page1.classList.remove('bg-primary-content', 'active');
            page2.classList.remove('bg-primary-content', 'active');
            page99.classList.remove('bg-primary-content', 'active');
            page100.classList.remove('bg-primary-content', 'active');

            // Handle display and content of page buttons
            if (totalPages <= 5) {
                // If total pages are 5 or less, show all buttons
                page1.innerText = 1;
                page1.style.display = 'inline-block';
                page2.innerText = 2;
                page2.style.display = totalPages >= 2 ? 'inline-block' : 'none';
                page99.innerText = 3;
                page99.style.display = totalPages >= 3 ? 'inline-block' : 'none';
                page100.innerText = 4;
                page100.style.display = totalPages >= 4 ? 'inline-block' : 'none';
                ellipsis.style.display = totalPages === 5 ? 'inline-block' : 'none';

                // Add active class to the current page
                if (currentPage === 1) page1.classList.add('bg-primary-content', 'active');
                if (currentPage === 2) page2.classList.add('bg-primary-content', 'active');
                if (currentPage === 3) page99.classList.add('bg-primary-content', 'active');
                if (currentPage === 4) page100.classList.add('bg-primary-content', 'active');
            } else {
                // If more than 5 pages, show dynamic pagination
                page1.innerText = currentPage === 1 ? 1 : currentPage - 1;
                page1.style.display = 'inline-block';
                page2.innerText = currentPage;
                page2.style.display = 'inline-block';
                page99.innerText = currentPage + 1;
                page99.style.display = currentPage + 1 <= totalPages ? 'inline-block' : 'none';
                page100.innerText = totalPages;
                page100.style.display = 'inline-block';
                ellipsis.style.display = currentPage < totalPages - 1 ? 'inline-block' : 'none';

                // Add active class to the current page
                if (currentPage === 1) {
                    page1.classList.add('bg-primary-content', 'active');
                } else if (currentPage === totalPages) {
                    page100.classList.add('bg-primary-content', 'active');
                } else {
                    page2.classList.add('bg-primary-content', 'active');
                }
            }

            // Disable previous and next buttons at first and last pages
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        }

        updatePagination(); // Initial call to set up pagination buttons

        prevBtn.addEventListener('click', goToPrevPage);
        nextBtn.addEventListener('click', goToNextPage);

        // Cleanup event listeners on component unmount
        return () => {
            prevBtn.removeEventListener('click', goToPrevPage);
            nextBtn.removeEventListener('click', goToNextPage);
        };
    }, [currentPage, totalPages]);
    return (
        <div className="mt-[1rem] text-center">
            <div className="join" id="pagination">
                <button className="join-item btn" id="prevBtn">«</button>
                <button className="join-item btn bg-primary-content active" id="page1">1</button>
                <button className="join-item btn" id="page2">2</button>
                <button className="join-item btn" id="ellipsis">...</button>
                <button className="join-item btn" id="page99">99</button>
                <button className="join-item btn" id="page100">100</button>
                <button className="join-item btn" id="nextBtn">»</button>
            </div>
        </div>
    )
}

export default Pagination;