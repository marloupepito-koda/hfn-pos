@if ($paginator->hasPages())
    <nav>
        <ul className="pagination">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <li className="page-item disabled" aria-disabled="true" aria-label="@lang('pagination.previous')">
                    <span className="page-link" aria-hidden="true">&lsaquo;</span>
                </li>
            @else
                <li className="page-item">
                    <a className="page-link" href="{{ $paginator->previousPageUrl() }}" rel="prev" aria-label="@lang('pagination.previous')">&lsaquo;</a>
                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <li className="page-item disabled" aria-disabled="true"><span className="page-link">{{ $element }}</span></li>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <li className="page-item active" aria-current="page"><span className="page-link">{{ $page }}</span></li>
                        @else
                            <li className="page-item"><a className="page-link" href="{{ $url }}">{{ $page }}</a></li>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <li className="page-item">
                    <a className="page-link" href="{{ $paginator->nextPageUrl() }}" rel="next" aria-label="@lang('pagination.next')">&rsaquo;</a>
                </li>
            @else
                <li className="page-item disabled" aria-disabled="true" aria-label="@lang('pagination.next')">
                    <span className="page-link" aria-hidden="true">&rsaquo;</span>
                </li>
            @endif
        </ul>
    </nav>
@endif
