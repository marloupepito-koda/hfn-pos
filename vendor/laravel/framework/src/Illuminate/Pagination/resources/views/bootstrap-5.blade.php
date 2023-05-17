@if ($paginator->hasPages())
    <nav className="d-flex justify-items-center justify-content-between">
        <div className="d-flex justify-content-between flex-fill d-sm-none">
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
        </div>

        <div className="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">
            <div>
                <p className="small text-muted">
                    {!! __('Showing') !!}
                    <span className="fw-semibold">{{ $paginator->firstItem() }}</span>
                    {!! __('to') !!}
                    <span className="fw-semibold">{{ $paginator->lastItem() }}</span>
                    {!! __('of') !!}
                    <span className="fw-semibold">{{ $paginator->total() }}</span>
                    {!! __('results') !!}
                </p>
            </div>

            <div>
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
            </div>
        </div>
    </nav>
@endif
