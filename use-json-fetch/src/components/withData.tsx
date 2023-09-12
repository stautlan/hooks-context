import React, { ComponentType } from 'react';

type DataProps = {
    data: any;
  };
  
  type ErrorProps = {
    error: any;
  };
  
  type LoadingProps = {
    isLoading: boolean;
  };
  
  type HocProps = DataProps | ErrorProps | LoadingProps;
  
  type HocComponentProps = {
    url: string;
  };

const withData = <P extends HocProps>(WrappedComponent: ComponentType<P>) => {
  return class HocComponent extends React.Component<HocComponentProps> {
    state = {
        data: null,
        error: null,
        isLoading: true,
    };

    componentDidMount(): void {
        fetch(this.props.url)
        .then(response => response.json())
        .then(data => {
          this.setState({ data, isLoading: false });
        })
        .catch(error => {
          this.setState({ error, isLoading: false })
        });
    }

    render() {
      const { data, error, isLoading } = this.state;

      if (isLoading) {
        return <LoadingComponent />;
      }

      if (error) {
        return <ErrorComponent error={error} />;
      }

      return <DataComponent data={data} />
    }
  }
}

export const LoadingComponent: React.FC = () => {
  return <div>Loading...</div>
}

export const ErrorComponent: React.FC<ErrorProps> = ({ error }) => {
  return <div>Error: {error.message}</div>;
};

type DataComponentProps = {
  data: any;
};

export const DataComponent: React.FC<DataComponentProps> = ({ data }) => {
  return <div>Data: {JSON.stringify(data)}</div>;
}

export default withData;