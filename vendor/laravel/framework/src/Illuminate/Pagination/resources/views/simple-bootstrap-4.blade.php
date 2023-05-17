@if ($paginator->hasPages())
    <nav>
        <ul className="pagination">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <li className="page-item disabled" aria-disabled="true">
                    <span className="page-link">@lang('pagination.previous')</span>
                </li>
            @else
                <li className="page-item">
                    <a className="page-link" href="{{ $paginator->previousPageUrl() }}" rel="prev">@lang('pagination.previous')</a>
                </li>
            @endif

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <li className="page-item">
                    <a className="page-link" href="{{ $paginator->nextPageUrl() }}" rel="next">@lang('pagination.next')</a>
                </li>
            @else
                <li className="page-item disabled" aria-disabled="true">
                    <span className="page-link">@lang('pagination.next')</span>
                </li>
            @endif
        </ul>
    </nav>
@endif
