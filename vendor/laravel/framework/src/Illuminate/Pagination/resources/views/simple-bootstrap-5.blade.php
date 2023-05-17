@if ($paginator->hasPages())
    <nav role="navigation" aria-label="Pagination Navigation">
        <ul className="pagination">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <li className="page-item disabled" aria-disabled="true">
                    <span className="page-link">{!! __('pagination.previous') !!}</span>
                </li>
            @else
                <li className="page-item">
                    <a className="page-link" href="{{ $paginator->previousPageUrl() }}" rel="prev">
                        {!! __('pagination.previous') !!}
                    </a>
                </li>
            @endif

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <li className="page-item">
                    <a className="page-link" href="{{ $paginator->nextPageUrl() }}" rel="next">{!! __('pagination.next') !!}</a>
                </li>
            @else
                <li className="page-item disabled" aria-disabled="true">
                    <span className="page-link">{!! __('pagination.next') !!}</span>
                </li>
            @endif
        </ul>
    </nav>
@endif
