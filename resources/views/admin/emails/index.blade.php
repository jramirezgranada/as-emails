@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-1">
                <a href="{{ route('emails.create') }}" class="btn btn-primary">+</a>
            </div>
            <div class="col-md-11">
                <div class="card">
                    <div class="card-header">Emails</div>

                    <div class="card-body">
                        @if(count($emails) > 0)
                            <table class="table">
                                <thead class="thead-light">
                                <tr>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Body</th>
                                    <th scope="col">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($emails as $email)
                                    <tr>
                                        <td>{{ $email->subject }}</td>
                                        <td>{{ substr($email->body, 0, 60) }} ...</td>
                                        <td>
                                            <span class="badge badge-{{ ($email->is_read) ? 'success' : 'warning' }}">{{ ($email->is_read) ? 'Read' : 'Unread' }}</span>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                            {{ $emails->links() }}
                        @else
                            <div class="alert alert-warning">
                                There are not emails in your inbox
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
