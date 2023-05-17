@if ($paginator->hasPages())
    <div className="ui pagination menu" role="navigation">
        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
            <a className="icon item disabled" aria-disabled="true" aria-label="@lang('pagination.previous')"> <i className="left chevron icon"></i> </a>
        @else
            <a className="icon item" href="{{ $paginator->previousPageUrl() }}" rel="prev" aria-label="@lang('pagination.previous')"> <i className="left chevron icon"></i> </a>
        @endif

        {{-- Pagination Elements --}}
        @foreach ($elements as $element)
            {{-- "Three Dots" Separator --}}
            @if (is_string($element))
                <a className="icon item disabled" aria-disabled="true">{{ $element }}</a>
            @endif

            {{-- Array Of Links --}}
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <a className="item active" href="{{ $url }}" aria-current="page">{{ $page }}</a>
                    @else
                        <a className="item" href="{{ $url }}">{{ $page }}</a>
                    @endif
                @endforeach
            @endif
        @endforeach

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
            <a className="icon item" href="{{ $paginator->nextPageUrl() }}" rel="next" aria-label="@lang('pagination.next')"> <i className="right chevron icon"></i> </a>
        @else
            <a className="icon item disabled" aria-disabled="true" aria-label="@lang('pagination.next')"> <i className="right chevron icon"></i> </a>
        @endif
    </div>
@endif
