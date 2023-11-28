<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome Page</title>
</head>
<body>
    @foreach ($allNews as $item)
            <h1>{{ $item->title }}</h1>
            <p>{{ $item->content }}</p>
            @if ($item->categorie)
                Category: {{ $item->categorie->name }}
            @else
                No category assigned
            @endif
    @endforeach
</body>
</html>